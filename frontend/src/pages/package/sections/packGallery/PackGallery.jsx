import './packGallery.scss';
import g1 from '../../../../assets/package/g1.png';
import g2 from '../../../../assets/package/g2.png';
import g3 from '../../../../assets/package/g3.png';
import { useEffect, useState } from 'react';

const PackGallery = () => {
  const gallery = [g1, g2, g3, g2, g1, g3];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === gallery.length - 2 ? 1 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, gallery.length]);

  const getImage = (index) => {
    return gallery[(index + gallery.length) % gallery.length];
  };

  return (
    <section className='PackGallery'>
      <div className='packDesc'>
        New York City comprises 5 boroughs sitting where the Hudson River meets
        the Atlantic Ocean. At its core is Manhattan, a densely populated
        borough that's among the world's major commercial, financial and
        cultural centers. Its iconic sites include skyscrapers such as the
        Empire State Building and sprawling Central Park. Broadway theater is
        staged in neon-lit Times Square.
      </div>
      <div
        className='packGallery'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className='photo side'>
          <img src={getImage(currentIndex - 1)} alt='' />
        </div>

        <div className='photo center'>
          <img src={getImage(currentIndex)} alt='' />
        </div>

        <div className='photo side'>
          <img src={getImage(currentIndex + 1)} alt='' />
        </div>
      </div>
    </section>
  );
};

export default PackGallery;
