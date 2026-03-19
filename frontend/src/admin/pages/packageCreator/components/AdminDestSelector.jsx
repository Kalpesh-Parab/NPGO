import { useState } from 'react';
import '../../../../pages/destination/sections/destSelector/destSelector.scss';
import API from '../../../services/api';
import IndiaMap from '../../../../pages/destination/sections/destSelector/IndiaMap';
import WorldMap from '../../../../pages/destination/sections/destSelector/WorldMap';

const AdminDestSelector = ({ onSelect }) => {
  const [mapType, setMapType] = useState('domestic');
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: '',
  });

  const handleSelect = async (code, name) => {
    console.log('🎯 ADMIN CLICK:', { code, name });

    try {
      if (code.startsWith('IN-')) {
        const res = await API.get(`/destinations/${code}`);

        onSelect({
          type: 'destination',
          _id: res.data.data._id,
          name: res.data.data.name,
          countryId: res.data.data.country._id,
        });
      } else {
        const res = await API.get(`/countries/${code}`);

        onSelect({
          type: 'country',
          _id: res.data.data._id,
          name: res.data.data.name,
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
              mode='admin'
              onSelect={handleSelect}
              setTooltip={setTooltip}
            />
          ) : (
            <WorldMap
              mode='admin'
              onSelect={handleSelect}
              setTooltip={setTooltip}
            />
          )}
          {tooltip.visible && (
            <div
              className='map-tooltip'
              style={{
                left: tooltip.x - 10,
                top: tooltip.y + 30,
                scale: 0.8,
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 9999,
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

export default AdminDestSelector;
