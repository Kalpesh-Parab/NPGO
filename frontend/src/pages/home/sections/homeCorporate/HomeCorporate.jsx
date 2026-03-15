import './homeCorporate.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';
import g1 from '../../../../assets/gallery/g1.png';
import g2 from '../../../../assets/gallery/g2.png';
import g3 from '../../../../assets/gallery/g3.png';
import g4 from '../../../../assets/gallery/g4.png';
import g5 from '../../../../assets/gallery/g5.png';
import g6 from '../../../../assets/gallery/g6.png';
import g7 from '../../../../assets/gallery/g7.png';
import g8 from '../../../../assets/gallery/g8.png';
import g9 from '../../../../assets/gallery/g9.png';
import g10 from '../../../../assets/gallery/g10.png';
import g11 from '../../../../assets/gallery/g11.png';
import g12 from '../../../../assets/gallery/g12.png';
import g13 from '../../../../assets/gallery/g13.png';
import g14 from '../../../../assets/gallery/g14.png';
import g15 from '../../../../assets/gallery/g15.png';
import g16 from '../../../../assets/gallery/g16.png';
import g17 from '../../../../assets/gallery/g17.png';
import g18 from '../../../../assets/gallery/g18.png';
import g19 from '../../../../assets/gallery/g19.png';
import g20 from '../../../../assets/gallery/g20.png';
import g21 from '../../../../assets/gallery/g21.png';
import g22 from '../../../../assets/gallery/g22.png';
import g23 from '../../../../assets/gallery/g23.png';
import g24 from '../../../../assets/gallery/g24.png';
import g25 from '../../../../assets/gallery/g25.png';
import g26 from '../../../../assets/gallery/g26.png';

const TYPING_TEXT =
  'Travel your way with complete flexibility and expert planning.';

const HomeCorporate = () => {
  const galleryImages = [
    g1,
    g2,
    g3,
    g4,
    g5,
    g6,
    g7,
    g8,
    g26,
    g9,
    g10,
    g11,
    g12,
    g13,
    g14,
    g15,
    g16,
    g17,
    g18,
    g19,
    g20,
    g21,
    g22,
    g23,
    g24,
    g25,
  ];

  const [typedText, setTypedText] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startTyping = () => {
      intervalRef.current = setInterval(() => {
        indexRef.current += 1;

        if (indexRef.current <= TYPING_TEXT.length) {
          setTypedText(TYPING_TEXT.slice(0, indexRef.current));
        } else {
          clearInterval(intervalRef.current);

          timeoutRef.current = setTimeout(() => {
            indexRef.current = 0;
            setTypedText('');
            startTyping();
          }, 1200);
        }
      }, 120);
    };

    startTyping();

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      indexRef.current = 0;
    };
  }, []);

  return (
    <section className='HomeCorporate'>
      <h4>Corporate Events</h4>

      <div className='gallery'>
        {galleryImages.map((img, index) => (
          <Fragment key={index}>
            {index === 11 && (
              <div className='imgContainer textContainer'>
                <p>{typedText}</p>
              </div>
            )}

            <div className='imgContainer'>
              <img src={img} alt={`Corporate Event ${index + 1}`} />
            </div>
          </Fragment>
        ))}
      </div>
      <div className='bot'>
        <h2>
          NPGO offers end-to-end corporate travel solutions for businesses and
          organizations. We specialize in planning
        </h2>
        <div className='desc1'>
          <h3>
            From logistics and stays to activities and on-ground coordination,
            we handle every detail to ensure a smooth, professional, and
            memorable corporate journey.
          </h3>
          <div className='button' onClick={() => navigate('/corporate-events')}>
            <span>View More Packages</span>
            <img src={arrow} alt='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCorporate;
