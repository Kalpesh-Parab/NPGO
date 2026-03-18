import './packGallery.scss';
import { useEffect, useState } from 'react';

const PackGallery = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [typedText, setTypedText] = useState('');

  if (!data) return null;

  const { gallery = [], description } = data;

  // Safety check (VERY IMPORTANT)
  if (gallery.length === 0) return null;

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === gallery.length - 2 ? 1 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [gallery.length]);

  // Typing effect
  useEffect(() => {
    const fullText = gallery[currentIndex]?.caption || '';
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
  }, [currentIndex, gallery]);

  const getItem = (index) => {
    return gallery[(index + gallery.length) % gallery.length];
  };

  return (
    <section className='PackGallery'>
      {/* DESCRIPTION */}
      <div className='packDesc'>
        {description}
      </div>

      <div className='packGallery'>
        {/* Left */}
        <div className='photo side'>
          <img src={getItem(currentIndex - 1)?.url} alt='' />
        </div>

        {/* Center */}
        <div className='photo center'>
          <img src={getItem(currentIndex)?.url} alt='' />

          <div className='overlay'>
            <p>{typedText}</p>
          </div>
        </div>

        {/* Right */}
        <div className='photo side'>
          <img src={getItem(currentIndex + 1)?.url} alt='' />
        </div>
      </div>
    </section>
  );
};

export default PackGallery;