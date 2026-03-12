import { useState, useContext } from 'react';
import './header.scss';
import { FiBell, FiCompass, FiMoon, FiSun } from 'react-icons/fi';
import CompassMenu from '../compassMenu/CompassMenu';
import logo from '../../../assets/logo.png';
import { ThemeContext } from '../../context/ThemeContext';

const Header = () => {
  const admin = JSON.parse(localStorage.getItem('admin'));
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [openCompass, setOpenCompass] = useState(false);

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
        <button className='admin-icon-btn'>
          <FiBell />
        </button>

        <button className='admin-icon-btn' onClick={toggleTheme}>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>

        <button
          className='admin-icon-btn compass-btn'
          onClick={() => setOpenCompass(!openCompass)}
        >
          <FiCompass />
        </button>
      </div>

      <CompassMenu isOpen={openCompass} />
    </header>
  );
};

export default Header;
