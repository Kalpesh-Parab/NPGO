import './destExplore.scss';
import arrow from '../../../../assets/arrow.svg';
import left from '../../../../assets/destination/left.svg';
import right from '../../../../assets/destination/right.svg';
import card1 from '../../../../assets/destination/c1.png';
import card2 from '../../../../assets/destination/c2.png';
import card3 from '../../../../assets/destination/c3.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const DestExplore = () => {
  const navigate = useNavigate();
  const cardsPerPage = 3;

  const cards = [
    {
      photo: card1,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card2,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card3,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card3,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card1,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card2,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card3,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card3,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
    {
      photo: card1,
      title: 'Maharashtra',
      desc: `From beaches to hill stations`,
    },
  ];

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, totalPages]);
  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const visibleCards = cards.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage,
  );

  return (
    <section className='DestExplore'>
      <div className='top'>
        <h4>Explore Destinations in India</h4>
        <div className='buttons'>
          <div className='left' onClick={handlePrev}>
            <img src={left} alt='' />
          </div>
          <div className='right' onClick={handleNext}>
            <img src={right} alt='' />
          </div>
        </div>
      </div>

      <div
        className='cards'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        key={currentPage}
      >
        {visibleCards.map((card, index) => (
          <div className='card' key={index}>
            <img src={card.photo} alt='' />
            <div className='info'>
              <div className='desc'>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
              <div className='button' onClick={() => navigate('/dest')}>
                <span>Explore Packages</span>
                <img src={arrow} alt='' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className='pagination'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`page ${currentPage === index ? 'active' : ''}`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default DestExplore;
