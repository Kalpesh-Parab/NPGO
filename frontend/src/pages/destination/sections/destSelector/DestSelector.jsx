import './destSelector.scss';

import i1 from '../../../../assets/destination/plan.svg';
import i2 from '../../../../assets/destination/globesearch.svg';
import i3 from '../../../../assets/destination/likeperson.svg';

import fallback from '../../../../assets/logo.png'; // 🔥 fallback

import { useEffect, useState } from 'react';
import IndiaMap from './IndiaMap';
import WorldMap from './WorldMap';
import { useNavigate } from 'react-router-dom';
import API from '../../../../admin/services/api';

const DestSelector = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: '',
  });

  const [mapType, setMapType] = useState('domestic');

  const [stateMedia, setStateMedia] = useState({});
  const [countryMedia, setCountryMedia] = useState({});

  const navigate = useNavigate();

  const tabs = [
    { icon: i1, name: `Bespoke Planning` },
    { icon: i2, name: `Handpicked Destinations` },
    { icon: i3, name: `Seamless Experiences` },
  ];

  // 🔥 FETCH INDIA DESTINATIONS
  const fetchIndiaDestinations = async () => {
    try {
      const res = await API.get('/destinations/country/IN');
      const data = res.data?.data || res.data;

      const mapped = {};

      data.forEach((item) => {
        mapped[item.code] = {
          name: item.name,
          media: item.media || fallback,
          type: item.mediaType || 'image',
        };
      });

      setStateMedia(mapped);
    } catch (err) {
      console.error('India fetch error', err);
    }
  };

  // 🔥 FETCH COUNTRIES
  const fetchCountries = async () => {
    try {
      const res = await API.get('/countries');
      const data = res.data?.data || res.data;

      const mapped = {};

      data
        .filter((c) => c.type === 'international')
        .forEach((item) => {
          mapped[item.code] = {
            name: item.name,
            media: item.media || fallback,
            type: item.mediaType || 'image',
          };
        });

      setCountryMedia(mapped);
    } catch (err) {
      console.error('Countries fetch error', err);
    }
  };

  useEffect(() => {
    fetchIndiaDestinations();
    fetchCountries();
  }, []);

  const handleSelect = (code, name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    if (mapType === 'domestic') {
      navigate(`/destination/india/${slug}`);
    } else {
      navigate(`/destination/${slug}`);
    }
  };

  return (
    <section className='DestSelector'>
      <div className='top'>
        <h4>Destination</h4>

        <div className='buttons'>
          <div
            className={`button ${mapType === 'domestic' ? 'active' : ''}`}
            onClick={() => setMapType('domestic')}
          >
            Domestic
          </div>

          <div
            className={`button ${mapType === 'international' ? 'active' : ''}`}
            onClick={() => setMapType('international')}
          >
            International
          </div>
        </div>
      </div>

      <div className='bottom'>
        <div className='left'>
          <h2>
            Let NPGO open the doors to extraordinary destinations across India
            and beyond.
          </h2>

          <h4>Bespoke journeys crafted to reflect your style and pace.</h4>

          <div className='tabs'>
            {tabs.map((tab, i) => (
              <div className='tab' key={i}>
                <img src={tab.icon} alt='' />
                <span>{tab.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='right'>
          {mapType === 'domestic' ? (
            <IndiaMap
              stateMedia={stateMedia}
              setTooltip={setTooltip}
              onSelect={handleSelect}
            />
          ) : (
            <WorldMap
              countryMedia={countryMedia}
              setTooltip={setTooltip}
              onSelect={handleSelect}
            />
          )}

          {tooltip.visible && (
            <div
              className='map-tooltip'
              style={{
                left: tooltip.x - 10,
                top: tooltip.y + 30,
                scale: 0.8,
              }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DestSelector;
