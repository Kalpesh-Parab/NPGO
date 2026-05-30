import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Imported useLocation
import './compassMenu.scss';

const CompassMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation(); // 2. Listen to the current URL/location
  const compassRef = useRef(null);
  const menuContainerRef = useRef(null);

  const [angle, setAngle] = useState(0);

  const menuItems = [
    'dashboard',
    'homepageEditor',
    'packageCreator',
    'activationZone',
    'eventCreator',
    'merchandise',
    'blogsEditor',
    'enquiries',
  ];

  // 3. FORCE CLOSE ON ROUTE CHANGE
  // If the user navigates (via clicking an item or hitting the back button), close the menu.
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]); // Fires every time the URL path changes

  // Effect for tracking mouse movement
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

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  // Effect to handle clicking outside the menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const radius = 190;
  const step = (2 * Math.PI) / menuItems.length;

  const handleItemClick = (item) => {
    navigate(`/admin/${item}`);
    onClose();
  };

  return (
    <div className='compass-overlay'>
      <div ref={menuContainerRef} className='compass-wrapper'>
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
                onClick={() => handleItemClick(item)}
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
