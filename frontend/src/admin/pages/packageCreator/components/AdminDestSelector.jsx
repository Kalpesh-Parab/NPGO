import { useState } from 'react';
import '../../../../pages/destination/sections/destSelector/destSelector.scss';
import API from '../../../services/api';
import IndiaMap from '../../../../pages/destination/sections/destSelector/IndiaMap';
import WorldMap from '../../../../pages/destination/sections/destSelector/WorldMap';

const AdminDestSelector = ({ onSelect }) => {
  const [mapType, setMapType] = useState('domestic');

  const handleSelect = async (code, name) => {
    console.log('🎯 ADMIN CLICK:', { code, name });

    try {
      if (code.startsWith('IN-')) {
        const res = await API.get(`/destinations/${code}`);

        onSelect({
          type: 'destination',
          _id: res.data._id,
          name: res.data.name,
          countryId: res.data.country,
        });
      } else {
        const res = await API.get(`/countries/${code}`);

        onSelect({
          type: 'country',
          _id: res.data._id,
          name: res.data.name,
        });
      }
    } catch (err) {
      console.warn('⚠️ Not found in DB, fallback used');

      // 🔥 fallback (VERY IMPORTANT)
      onSelect({
        type: code.startsWith('IN-') ? 'destination' : 'country',
        _id: null,
        name,
        code,
      });
    }
  };

  return (
    <section className='DestSelector'>
      <div className='top'>
        <h4>Select Location</h4>

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
        <div className='right'>
          {mapType === 'domestic' ? (
            <IndiaMap
              mode='admin' // 🔥 IMPORTANT
              onSelect={handleSelect}
            />
          ) : (
            <WorldMap mode='admin' onSelect={handleSelect} />
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDestSelector;
