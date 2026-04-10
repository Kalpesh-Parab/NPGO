import './homeCorporate.scss';
import { Fragment, useEffect, useRef, useState, useMemo } from 'react';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';

const HomeCorporate = ({ data }) => {
  const navigate = useNavigate();

  const galleryImages = data?.images || [];
  const TYPING_TEXT =
    data?.typingText ||
    'Travel your way with complete flexibility and expert planning.';

  // ✅ typing animation
  const [typedText, setTypedText] = useState('');
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!TYPING_TEXT) return;

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
  }, [TYPING_TEXT]);

  // ✅ mobile detection (safe)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 480 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🎲 Fisher-Yates shuffle
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // ✅ memoized mobile grid (important)
  const mobileGridData = useMemo(() => {
    if (!isMobile) return [];

    const shuffled = shuffleArray(galleryImages);
    const selectedImages = shuffled.slice(0, 8);

    const finalArray = [...selectedImages];
    finalArray.splice(4, 0, { type: 'text' });

    return finalArray;
  }, [isMobile, galleryImages]);

  // ✅ AFTER hooks (important fix)
  if (!data) return null;

  return (
    <section className='HomeCorporate'>
      <h4>{data.title}</h4>

      <div className='gallery'>
        {isMobile
          ? mobileGridData.map((item, index) => {
              if (item.type === 'text') {
                return (
                  <div key={index} className='imgContainer textContainer'>
                    <p>{typedText}</p>
                  </div>
                );
              }

              return (
                <div key={index} className='imgContainer'>
                  <img
                    src={item.url}
                    alt={item.alt || `Corporate Event ${index + 1}`}
                  />
                </div>
              );
            })
          : galleryImages.map((img, index) => (
              <Fragment key={index}>
                {index === 11 && (
                  <div className='imgContainer textContainer'>
                    <p>{typedText}</p>
                  </div>
                )}

                <div className='imgContainer'>
                  <img
                    src={img.url}
                    alt={img.alt || `Corporate Event ${index + 1}`}
                  />
                </div>
              </Fragment>
            ))}
      </div>

      <div className='bot'>
        <h2>{data.bottomHeading}</h2>

        <div className='desc1'>
          <h3>{data.bottomDescription}</h3>

          {data.buttonText && (
            <div className='button' onClick={() => navigate(data.buttonLink)}>
              <span>{data.buttonText}</span>
              <img src={arrow} alt='' />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeCorporate;
