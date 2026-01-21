import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './header.scss';
import logo from '../../../src/assets/logo.png';
import arrow from '../../../src/assets/arrowWhite.svg';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className={`Header ${hidden ? 'hide' : ''}`}>
      {/* Logo */}
      <div className='logo' onClick={() => navigate('/')}>
        <img src={logo} alt='Logo' />
      </div>

      {/* Nav Links */}
      <div className='links'>
        <NavLink to='/' end className='link'>
          Home
        </NavLink>
        <NavLink to='/destination' className='link'>
          Destination
        </NavLink>
        <NavLink to='/about' className='link'>
          About us
        </NavLink>
        <NavLink to='/customise' className='link'>
          Customize pack
        </NavLink>
        <NavLink to='/corporate-events' className='link'>
          Corporate events
        </NavLink>
        <NavLink to='/merchandise' className='link'>
          Merchandise
        </NavLink>
      </div>
      <div className='button' onClick={() => navigate('/contact')}>
        <span>Contact Us</span>
        <img src={arrow} alt='' />
      </div>
    </div>
  );
};

export default Header;
