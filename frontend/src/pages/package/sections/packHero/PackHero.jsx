import './packHero.scss';
import arrow from '../../../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PackHero = ({ data }) => {
  const navigate = useNavigate();
  const [showAllTypes, setShowAllTypes] = useState(false);

  if (!data) return null;

  const { title, price, currency, types = [], heroMedia } = data;

  const visibleTypes = showAllTypes ? types : types.slice(0, 3);
  const remainingCount = types.length - 3;
  useEffect(() => {
    if (!showAllTypes) return;

    const timer = setTimeout(() => {
      setShowAllTypes(false);
    }, 7000); // 7 seconds (you can tweak 5–10s)

    return () => clearTimeout(timer);
  }, [showAllTypes]);
  return (
    <section className='PackHero'>
      <div className='background'>
        <video src={heroMedia.url} autoPlay loop muted playsInline></video>
      </div>

      <div className='overlay'></div>

      <div className='details'>
        <h4>Package Details</h4>

        <h2>{title}</h2>

        {/* TAGS */}
        <div className='tags'>
          {visibleTypes.map((type, index) => (
            <div className='tag' key={index}>
              {type}
            </div>
          ))}

          {!showAllTypes && remainingCount > 0 && (
            <div
              className='tag more'
              onClick={() => setShowAllTypes((prev) => !prev)}
              style={{cursor:'pointer'}}
            >
              +{remainingCount} more
            </div>
          )}
        </div>

        {/* PRICE */}
        <div className='price'>
          <div className='start'>Starting From</div>
          <div className='cost'>
            <span>
              {currency}{' '}
              {price}
            </span>{' '}
            per person
          </div>
        </div>

        {/* CTA */}
        <div className='button' onClick={() => navigate('/destination')}>
          <span>Enquire Now</span>
          <img src={arrow} alt='' />
        </div>
      </div>
    </section>
  );
};

export default PackHero;
