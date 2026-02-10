import './homeTesti.scss';
import { useEffect, useState } from 'react';
import quote from '../../../../assets/quote.svg';
import right from '../../../../assets/right.png';
import left from '../../../../assets/left.png';
import t1 from '../../../../assets/t1.png';
import t2 from '../../../../assets/b1.png';
import t1q from '../../../../assets/t1q.png';

const HomeTesti = () => {
  const testimonials = [
    {
      photo: t1,
      title: `Really loved the travel experience with NPGO. A well planned trip.`,
      review: `From breathtaking natural landscapes and iconic landmarks to vibrant cities and hidden local treasures, NPGO helps you discover places that inspire every kind of traveler.`,
      rating: 5,
      name: `Amrita Shinde`,
      profile: t1q,
    },
    {
      photo: t2,
      title: `Amazing coordination and smooth execution.`,
      review: `Everything from stay to travel was seamless. Highly recommended.`,
      rating: 3.7,
      name: `Rahul Patil`,
      profile: t1q,
    },
    {
      photo: t1,
      title: `One of my best travel experiences.`,
      review: `Professional planning and friendly support throughout the journey.`,
      rating: 4.5,
      name: `Sneha Kulkarni`,
      profile: t1q,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);

  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  useEffect(() => {
    const timer = setTimeout(next, 10000);
    return () => clearTimeout(timer);
  }, [activeIndex]);

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
            <img src={test.photo} alt='' />
          </div>

          <div className='right'>
            <h3>{test.title}</h3>
            <h4>{test.review}</h4>

            <div className='profile'>
              <img src={test.profile} alt='' />
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
