import './packGallery.scss';
import g1 from '../../../../assets/package/g1.png';
import g2 from '../../../../assets/package/g2.png';
import g3 from '../../../../assets/package/g3.png';
import { useEffect, useState } from 'react';

const PackGallery = () => {
  const gallery = [
    { img: g1, desc: 'Manhattan Bridge, New York, United States' },
    { img: g2, desc: 'Times Square lights up the night skyline' },
    { img: g3, desc: 'Statue of Liberty standing tall in the harbor' },
    { img: g2, desc: 'Central Park in the heart of the city' },
    { img: g1, desc: 'Broadway’s iconic theatre district' },
    { img: g3, desc: 'NYC skyline touching the clouds' },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [typedText, setTypedText] = useState('');

  // Auto slide (no pause now)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === gallery.length - 2 ? 1 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [gallery.length]);

  // Typing effect
  useEffect(() => {
    const fullText = gallery[currentIndex].desc;
    setTypedText('');

    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [currentIndex]);

  const getItem = (index) => {
    return gallery[(index + gallery.length) % gallery.length];
  };

  return (
    <section className='PackGallery'>
      <div className='packDesc'>
        New York City comprises 5 boroughs sitting where the Hudson River meets
        the Atlantic Ocean. At its core is Manhattan, a densely populated
        borough that’s among the world’s major commercial, financial and
        cultural centers. Its iconic sites include skyscrapers such as the
        Empire State Building and sprawling Central Park. Broadway theater is
        staged in neon-lit Times Square.
      </div>

      <div className='packGallery'>
        {/* Left */}
        <div className='photo side'>
          <img src={getItem(currentIndex - 1).img} alt='' />
        </div>

        {/* Center */}
        <div className='photo center'>
          <img src={getItem(currentIndex).img} alt='' />

          <div className='overlay'>
            <p>{typedText}</p>
          </div>
        </div>

        {/* Right */}
        <div className='photo side'>
          <img src={getItem(currentIndex + 1).img} alt='' />
        </div>
      </div>
    </section>
  );
};

export default PackGallery;
