import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './compassMenu.scss';

const CompassMenu = ({ isOpen }) => {
  const navigate = useNavigate();
  const compassRef = useRef(null);

  const [angle, setAngle] = useState(0);

  const menuItems = [
    'dashboard',
    'homepageEditor',
    'packageCreator',
    'activationZone',
    'eventCreator',
    'merchandise',
    'blogsEditor',
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!compassRef.current) return;

      const rect = compassRef.current.getBoundingClientRect();

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const radians = Math.atan2(dy, dx);

      let degrees = radians * (180 / Math.PI);

      degrees += 90;

      setAngle(degrees);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isOpen) return null;

  const radius = 170;
  const step = (2 * Math.PI) / menuItems.length;

  return (
    <div className='compass-overlay'>
      <div className='compass-wrapper'>
        <div className='compass-cap'></div>

        <div ref={compassRef} className='compass-box'>
          {/* compass needle */}

          <div
            className='compass-needle'
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div className='needle-north'></div>
            <div className='needle-south'></div>
          </div>

          <div className='compass-pin'></div>

          {menuItems.map((item, index) => {
            const rad = step * index;

            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            const rotation = (rad * 180) / Math.PI + 90;

            return (
              <div
                key={item}
                className='compass-item'
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                }}
                onClick={() => navigate(`/admin/${item}`)}
              >
                <span className='compass-text'>{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompassMenu;
