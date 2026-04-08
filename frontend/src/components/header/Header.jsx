import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './header.scss';
import logo from '../../../src/assets/logo.png';
import arrow from '../../../src/assets/arrowWhite.svg';

const Header = () => {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide / Show Header
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      // Close menu on scroll (mobile UX 🔥)
      setMenuOpen(false);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu after click
  };

  return (
    <div className={`Header ${hidden ? 'hide' : ''}`}>
      {/* Logo */}
      <div className='logo' onClick={() => handleNavigate('/')}>
        <img src={logo} alt='Logo' />
      </div>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <div className={`links ${menuOpen ? 'open' : ''}`}>
        <NavLink to='/' end className='link' onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to='/dest' className='link' onClick={() => setMenuOpen(false)}>
          Destination
        </NavLink>
        <NavLink
          to='/about'
          className='link'
          onClick={() => setMenuOpen(false)}
        >
          About us
        </NavLink>
        <NavLink
          to='/customise'
          className='link'
          onClick={() => setMenuOpen(false)}
        >
          Customize pack
        </NavLink>
        <NavLink
          to='/corporate-events'
          className='link'
          onClick={() => setMenuOpen(false)}
        >
          Corporate events
        </NavLink>
        <NavLink
          to='/merchandise'
          className='link'
          onClick={() => setMenuOpen(false)}
        >
          Merchandise
        </NavLink>
        <NavLink
          to='/events'
          className='link'
          onClick={() => setMenuOpen(false)}
        >
          NPGO events
        </NavLink>

        {/* Mobile Contact Button inside menu */}
        <div
          className='mobile-contact'
          onClick={() => handleNavigate('/contact')}
        >
          Contact Us
        </div>
      </div>

      {/* Desktop Button */}
      <div className='button' onClick={() => handleNavigate('/contact')}>
        <span>Contact Us</span>
        <img src={arrow} alt='' />
      </div>
    </div>
  );
};

export default Header;
