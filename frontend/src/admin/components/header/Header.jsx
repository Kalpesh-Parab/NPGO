import { useState, useContext, useRef } from 'react';
import './header.scss';
import { FiBell, FiCompass, FiMoon, FiSun } from 'react-icons/fi';
import CompassMenu from '../compassMenu/CompassMenu';
import logo from '../../../assets/logo.png';
import { ThemeContext } from '../../context/ThemeContext';
import API from '../../services/api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const bellRef = useRef(null);
  const compassRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [counts, setCounts] = useState({
    contact: 0,
    custom: 0,
  });
  const [openBell, setOpenBell] = useState(false);
  const [openCompass, setOpenCompass] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [contactRes, customRes] = await Promise.all([
          API.get('/contact'),
          API.get('/custom-enquiry'),
        ]);

        const contactNew = contactRes.data.data.filter(
          (e) => e.status === 'new',
        ).length;

        const customNew = customRes.data.data.filter(
          (e) => e.status === 'new',
        ).length;

        setCounts({
          contact: contactNew,
          custom: customNew,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 🔔 Close Bell
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setOpenBell(false);
      }

      // 🧭 Close Compass
      if (compassRef.current && !compassRef.current.contains(event.target)) {
        setOpenCompass(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className='admin-header'>
      <div className='admin-header-left'>
        <div className='admin-logo'>
          <img src={logo} alt='' />
        </div>

        <div className='admin-welcome'>
          Welcome back,
          <span className='admin-name'> {admin?.name || 'Admin'}</span>
        </div>
      </div>

      <div className='admin-header-right'>
        <div ref={bellRef}>
          <button
            className='admin-icon-btn bell-btn'
            onClick={() => setOpenBell(!openBell)}
          >
            <FiBell />
            {counts.contact + counts.custom > 0 && (
              <span className='badge-count'>
                {counts.contact + counts.custom}
              </span>
            )}
          </button>

          {openBell && (
            <div className='bell-dropdown'>
              <h4>New Enquiries</h4>

              <div className='bell-item'>
                Contact Forms
                <span>{counts.contact} new</span>
              </div>

              <div className='bell-item'>
                Custom Forms
                <span>{counts.custom} new</span>
              </div>

              <div
                className='bell-view-all'
                onClick={() => {
                  navigate('/admin/enquiries');
                  setOpenBell(false); // 🔥 close after nav
                }}
              >
                View All
              </div>
            </div>
          )}
        </div>

        <button className='admin-icon-btn' onClick={toggleTheme}>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>

        <div ref={compassRef}>
          <button
            className='admin-icon-btn compass-btn'
            onClick={() => setOpenCompass(!openCompass)}
          >
            <FiCompass />
          </button>

          <CompassMenu
            isOpen={openCompass}
            onClose={() => setOpenCompass(false)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
