import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let targetScroll = 0;

    if (pathname.startsWith('/destination')) {
      // Calculate 20% of the total document height
      const docHeight = document.documentElement.scrollHeight;
      targetScroll = docHeight * .1;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;