import { useState, useEffect, useMemo } from 'react';
import './destListFilter.scss';
import API from '../../../../admin/services/api';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useWebHaptics } from 'web-haptics/react';

const DestListFilter = ({
  packageTypes = [],
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
  allPackages = [],
}) => {
  const searchRef = useRef();
  const [activeType, setActiveType] = useState('domestic');
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pickerRef = useRef();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { trigger } = useWebHaptics();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryRes = await API.get('/countries');
        const destRes = await API.get('/destinations/country/IN');

        // 🔥 FIX: normalize response
        const countriesData = Array.isArray(countryRes.data)
          ? countryRes.data
          : countryRes.data?.data || [];

        const statesData = Array.isArray(destRes.data)
          ? destRes.data
          : destRes.data?.data || [];

        setCountries(countriesData);
        setStates(statesData);

        console.log('COUNTRIES:', countriesData);
        console.log('STATES:', statesData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleLocationChange = (value) => {
    if (!value) return;

    if (activeType === 'domestic') {
      navigate(`/destination/india/${value}`);
    } else {
      navigate(`/destination/${value}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const handleScroll = () => {
    if (!pickerRef.current) return;

    const container = pickerRef.current;
    const children = container.children;

    const center = container.scrollTop + container.clientHeight / 2;

    let closest = 0;
    let minDist = Infinity;

    Array.from(children).forEach((child, index) => {
      const offset = child.offsetTop + child.clientHeight / 2;
      const dist = Math.abs(center - offset);

      if (dist < minDist) {
        minDist = dist;
        closest = index;
      }
    });

    setSelectedIndex(closest);
  };

  useEffect(() => {
    if (isMobile) {
      trigger('selection');
    }
  }, [selectedIndex]);
const dataList = useMemo(() => {
  const rawList = activeType === 'domestic' ? states : countries;

  return [...rawList].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}, [activeType, states, countries]);
  const loopedList = [
    ...dataList,
    ...dataList,
    ...dataList,
    ...dataList,
    ...dataList,
  ];

  useEffect(() => {
    if (!dataList.length) return;

    const timeout = setTimeout(() => {
      const realIndex = selectedIndex % dataList.length;
      const selectedItem = dataList[realIndex];

      if (selectedItem) {
        handleLocationChange(slugify(selectedItem.name));
      }
    }, 3000); // 🔥 3 sec delay

    return () => clearTimeout(timeout);
  }, [selectedIndex]);

  useEffect(() => {
    if (!pickerRef.current || !dataList.length) return;

    const itemHeight = pickerRef.current.children[0]?.clientHeight || 1;

    pickerRef.current.scrollTop = dataList.length * itemHeight; // 🔥 center in middle copy
  }, [dataList]);

  const scrollToIndex = (index) => {
    if (!pickerRef.current) return;

    const container = pickerRef.current;
    const itemHeight = container.children[0]?.clientHeight || 1;

    const middleOffset = dataList.length;
    const targetIndex = middleOffset + index;

    const containerHeight = container.clientHeight;

    // 🔥 THIS IS THE REAL FIX
    const scrollTop =
      targetIndex * itemHeight - containerHeight / 2 + itemHeight / 2;

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });

    setSelectedIndex(targetIndex);
  };
  return (
    <section className='DestListFilter'>
      <div className='buttons'>
        <div
          className={`button ${activeType === 'domestic' ? 'active' : ''}`}
          onClick={() => setActiveType('domestic')}
        >
          Domestic
        </div>

        <div
          className={`button ${activeType === 'international' ? 'active' : ''}`}
          onClick={() => setActiveType('international')}
        >
          International
        </div>
      </div>

      <div className='bottom'>
        <h4>Filter Destination</h4>

        <div className='filters'>
          <div className='search' ref={searchRef}>
            <input
              type='text'
              placeholder='Search packages...'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true); // 👈 open dropdown
              }}
              onFocus={() => setShowSuggestions(true)} // 👈 when user clicks input
            />
            {showSuggestions && searchQuery && (
              <div className='searchSuggestions'>
                {allPackages
                  .filter((pkg) =>
                    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()),
                  )
                  .slice(0, 5)
                  .map((pkg, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setSearchQuery(pkg.title);
                        setShowSuggestions(false); // 🔥 CLOSE DROPDOWN
                      }}
                    >
                      {pkg.title}
                    </div>
                  ))}
              </div>
            )}
          </div>
          {/* Location */}
          <div className='location'>
            {isMobile && (
              <p className='pickerLabel'>
                {activeType === 'domestic' ? 'Select State' : 'Select Country'}
              </p>
            )}
            {isMobile ? (
              <div className='picker'>
                <div
                  className='pickerWrapper'
                  ref={pickerRef}
                  onScroll={handleScroll}
                >
                  {loopedList.map((item, index) => {
                    const realIndex = index % dataList.length;

                    return (
                      <div
                        key={index}
                        className={`pickerItem ${
                          selectedIndex === index ? 'active' : ''
                        }`}
                      >
                        {dataList[realIndex].name}
                      </div>
                    );
                  })}
                </div>
                <div
                  className='arrow'
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  ▼
                </div>
                {showDropdown && (
                  <div className='dropdown'>
                    {dataList.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          const index = dataList.findIndex(
                            (d) => d._id === item._id,
                          );

                          scrollToIndex(index); // 🔥 sync picker
                          handleLocationChange(slugify(item.name));

                          setShowDropdown(false);
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <select onChange={(e) => handleLocationChange(e.target.value)}>
                <option value=''>
                  {activeType === 'domestic'
                    ? 'Select State'
                    : 'Select Country'}
                </option>

                {(activeType === 'domestic' ? states : countries).map(
                  (item) => (
                    <option key={item._id} value={slugify(item.name)}>
                      {item.name}
                    </option>
                  ),
                )}
              </select>
            )}
          </div>

          {/* Package Type */}
          <div className='packageType'>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value=''>Select Package Type</option>

              {Array.isArray(packageTypes) &&
                packageTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestListFilter;
