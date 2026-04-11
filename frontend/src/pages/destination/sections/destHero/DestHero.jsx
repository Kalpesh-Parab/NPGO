import './destHero.scss';
import arrow from '../../../../assets/arrow.svg';
import arrowWhite from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';

// Local images (can later be replaced with API data)
import h1 from '../../../../assets/destination/h1.png';
import h2 from '../../../../assets/destination/h2.png';
import h3 from '../../../../assets/destination/h3.png';
import h4 from '../../../../assets/destination/h4.png';
import h5 from '../../../../assets/destination/h5.png';
import h6 from '../../../../assets/destination/h6.png';
import h7 from '../../../../assets/destination/h7.png';
import h8 from '../../../../assets/destination/h8.png';
import h9 from '../../../../assets/destination/h9.png';
import h10 from '../../../../assets/destination/h10.png';
import h11 from '../../../../assets/destination/h11.png';
import h12 from '../../../../assets/destination/h12.png';
import { useEffect, useState } from 'react';

const DestHero = () => {
  const navigate = useNavigate();

  const heroImages = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12];

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [mobileImages, setMobileImages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);

    // initial mobile images
    generateMobileImages();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateMobileImages = () => {
    const shuffled = [...heroImages].sort(() => 0.5 - Math.random());
    setMobileImages(shuffled.slice(0, 9));
  };

  // Decide which images to use
  const images = isMobile ? mobileImages : heroImages;

  return (
    <section className='DestHero'>
      <div className='top'>
        <div className='heading'>
          Explore Incredible Destinations <br /> Across India
        </div>

        <div className='subHeading'>
          From serene beaches to majestic mountains, discover handpicked Indian
          destinations curated by NPGO.
        </div>

        <div className='buttons'>
          <div
            className='buttonWhite'
            onClick={() => navigate('/destination/india')}
          >
            <span>Explore Indian Destinations</span>
            <img src={arrowWhite} alt='' />
          </div>

          <div
            className='button'
            onClick={() => navigate('/destination/canada')}
          >
            <span>International Trips</span>
            <img src={arrow} alt='' />
          </div>
        </div>
      </div>

      <div className='bottom'>
        {/* FIRST ROW */}
        <div className='first'>
          {(isMobile ? images.slice(0, 3) : images.slice(0, 2)).map(
            (img, index) => (
              <div key={index} className={`imgWrapper img-${index}`}>
                <img src={img} alt={`destination-${index}`} />
              </div>
            ),
          )}
        </div>

        {/* SECOND ROW */}
        <div className='second'>
          <div className='three'>
            {(isMobile ? images.slice(3, 5) : images.slice(2, 4)).map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`destination-${index}`}
                  className={index === 1 ? 'h4' : ''}
                />
              ),
            )}
          </div>

          <div className='four'>
            {(isMobile ? images.slice(5, 6) : images.slice(4, 6)).map(
              (img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`destination-${index}`}
                  className={index === 0 ? 'h5' : ''}
                />
              ),
            )}
          </div>
        </div>

        {/* THIRD ROW */}
        <div className='third'>
          {(isMobile ? images.slice(6, 9) : images.slice(6, 12)).map(
            (img, index) => (
              <div key={index} className={`h${index + 7}`}>
                <img src={img} alt={`destination-${index}`} />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default DestHero;