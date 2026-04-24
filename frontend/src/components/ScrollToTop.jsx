import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isMobile = window.innerWidth <= 480;

    // 🔥 Special case for destination pages
    if (pathname.startsWith('/destination')) {
      const docHeight = document.documentElement.scrollHeight;

      window.scrollTo({
        top: isMobile ? 500 : docHeight * 0.1,
        behavior: 'smooth',
      });
    } else {
      // ✅ Default behavior for ALL other pages
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
