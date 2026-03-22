import { useState, useEffect } from 'react';
import './destListFilter.scss';
import API from '../../../../admin/services/api';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

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
            <select onChange={(e) => handleLocationChange(e.target.value)}>
              <option value=''>
                {activeType === 'domestic' ? 'Select State' : 'Select Country'}
              </option>

              {Array.isArray(activeType === 'domestic' ? states : countries) &&
                (activeType === 'domestic' ? states : countries).map((item) => (
                  <option key={item._id} value={slugify(item.name)}>
                    {item.name}
                  </option>
                ))}
            </select>
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
