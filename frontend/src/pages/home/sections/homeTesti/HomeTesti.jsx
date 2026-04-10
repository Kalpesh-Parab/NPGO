import './homeTesti.scss';
import { useEffect, useState } from 'react';
import quote from '../../../../assets/quote.svg';
import right from '../../../../assets/right.png';
import left from '../../../../assets/left.png';

const HomeTesti = ({ data }) => {
  const testimonials = data || [];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () =>
    setActiveIndex((prev) =>
      testimonials.length ? (prev + 1) % testimonials.length : 0,
    );

  const prev = () =>
    setActiveIndex((prev) =>
      testimonials.length
        ? (prev - 1 + testimonials.length) % testimonials.length
        : 0,
    );

  useEffect(() => {
    if (!testimonials.length) return;

    const timer = setTimeout(next, 10000);
    return () => clearTimeout(timer);
  }, [activeIndex, testimonials.length]);

  if (!testimonials.length) return null;

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const fill = rating >= i ? 100 : rating + 1 > i ? (rating % 1) * 100 : 0;

      stars.push(
        <span className='star' key={i}>
          <span className='fill' style={{ width: `${fill}%` }} />
        </span>,
      );
    }

    return <div className='stars'>{stars}</div>;
  };

  const test = testimonials[activeIndex];

  return (
    <section className='HomeTesti'>
      <div className='top'>
        <h4>Testimonials</h4>

        <div className='quote'>
          <img src={quote} alt='' />
          <img src={quote} alt='' />
        </div>
      </div>

      <div className='mid'>
        <h2>
          Here's what people have to say about working together. Real moments,
          real experiences, real feedback.
        </h2>

        <div className='arrows'>
          <button onClick={prev}>
            <img src={left} alt='Previous' />
          </button>

          <button onClick={next}>
            <img src={right} alt='Next' />
          </button>
        </div>
      </div>

      <div className='bottom'>
        <div className='testimonial'>
          <div className='left'>
            {test.photo?.url && <img src={test.photo.url} alt={test.name} />}
          </div>
          <div className='midBottom'>
            <div className='quote'>
              <img src={quote} alt='' />
              <img src={quote} alt='' />
            </div>
            <div className='arrows'>
              <button onClick={prev}>
                <img src={left} alt='Previous' />
              </button>

              <button onClick={next}>
                <img src={right} alt='Next' />
              </button>
            </div>
          </div>
          <div className='right'>
            <h3>{test.title}</h3>

            <h4>{test.review}</h4>

            <div className='profile'>
              {test.profile?.url && (
                <img src={test.profile.url} alt={test.name} />
              )}

              <div className='ratings'>
                {renderStars(test.rating)}
                <div className='name'>{test.name}</div>
              </div>
            </div>

            <div className='pagination'>
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === activeIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTesti;
