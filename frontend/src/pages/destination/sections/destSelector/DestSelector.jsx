import './destSelector.scss';
import i1 from '../../../../assets/destination/plan.svg';
import i2 from '../../../../assets/destination/globesearch.svg';
import i3 from '../../../../assets/destination/likeperson.svg';
// import mh from '../../../../assets/v1.MP4';
import mh from '../../../../assets/b1.png';
import gj from '../../../../assets/v2.mp4';
import { useEffect, useRef, useState } from 'react';
import IndiaMap from './IndiaMap';
import WorldMap from './WorldMap';
import { useNavigate } from 'react-router-dom';

const DestSelector = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: '',
  });

  //   const [activeState, setActiveState] = useState(null);
  //   const svgRef = useRef(null);
  //   const [bbox, setBbox] = useState(null);
  const [mapType, setMapType] = useState('domestic');

  //   const handleHover = (id) => {
  //     if (!svgRef.current) return;

  //     const el = svgRef.current.querySelector(`#${id}`);
  //     if (!el) return;

  //     const box = el.getBBox();

  //     setActiveState(id);
  //     setBbox(box);
  //   };

  useEffect(() => {
    // Reset hover when switching maps
  }, [mapType]);

  //   const handleLeave = () => {
  //     setActiveState(null);
  //     setBbox(null);
  //   };

  const tabs = [
    {
      icon: i1,
      name: `Bespoke Planning`,
    },
    {
      icon: i2,
      name: `Handpicked Destinations`,
    },
    {
      icon: i3,
      name: `Seamless Experiences`,
    },
  ];

  const stateMedia = {
    'IN-MH': {
      name: 'Maharashtra',
      media: mh,
      type: 'image',
    },
    'IN-GJ': {
      name: 'Gujarat',
      media: gj,
      type: 'video',
    },
  };

  const countryMedia = {
    IN: {
      name: 'India',
      media: gj,
      type: 'video',
    },
  };

  const navigate = useNavigate();
  const handleSelect = (code, name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    if (mapType === 'domestic') {
      // example → /destination/india/maharashtra
      navigate(`/destination/india/${slug}`);
    } else {
      // example → /destination/japan
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
            and beyond, creating journeys that go far beyond travel.
          </h2>
          <h4>
            Whether it's leisure, adventure, romance, or corporate travel, our
            bespoke journeys are crafted to reflect your style and pace.
          </h4>

          <div className='tabs'>
            {tabs.map((tab) => (
              <div className='tab'>
                <img src={tab.icon} alt='' />
                <span>{tab.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className='right'>
          {mapType === 'domestic' ? (
            <IndiaMap stateMedia={stateMedia} setTooltip={setTooltip} onSelect={handleSelect}/>
          ) : (
            <WorldMap countryMedia={countryMedia} setTooltip={setTooltip} onSelect={handleSelect}/>
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
