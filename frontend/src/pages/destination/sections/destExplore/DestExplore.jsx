import './destExplore.scss';
import arrow from '../../../../assets/arrow.svg';
import left from '../../../../assets/destination/left.svg';
import right from '../../../../assets/destination/right.svg';
import fallback from '../../../../assets/logo.png';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../../../admin/services/api';

const DestExplore = () => {
  const navigate = useNavigate();
  const cardsPerPage = 3;

  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 🔥 FETCH + PREPARE DATA
  const fetchDestinations = async () => {
    try {
      const res = await API.get('/destinations/country/IN');
      let data = res.data?.data || res.data;

      // ✅ filter only active + with media
      data = data.filter((d) => d.isActive && d.media);

      // ✅ shuffle (random)
      data = data.sort(() => 0.5 - Math.random()).slice(0, 9);

      // 🔥 fetch package counts
      const cardsData = await Promise.all(
        data.map(async (item) => {
          const slug = item.name.toLowerCase().replace(/\s+/g, '-');

          try {
            const pkgRes = await API.get(
              `/packages/by-location?country=india&destination=${slug}`,
            );

            const pkgData = Array.isArray(pkgRes.data)
              ? pkgRes.data
              : pkgRes.data?.data || [];

            return {
              title: item.name,
              slug,
              media: item.media || fallback,
              type: item.mediaType || 'image',
              packageCount: pkgData.length,
            };
          } catch {
            return {
              title: item.name,
              slug,
              media: item.media || fallback,
              type: item.mediaType || 'image',
              packageCount: 0,
            };
          }
        }),
      );

      setCards(cardsData);
    } catch (err) {
      console.error('DestExplore fetch error', err);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const totalPages = Math.ceil(cards.length / cardsPerPage);

  useEffect(() => {
    if (isPaused || totalPages === 0) return;

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
            {/* 🔥 MEDIA */}
            {card.type === 'video' ? (
              <video src={card.media} autoPlay muted loop playsInline />
            ) : (
              <img src={card.media} alt='' />
            )}

            <div className='info'>
              <div className='desc'>
                <h4>{card.title}</h4>
                <p>{card.packageCount} Packages</p>
              </div>

              <div
                className='button'
                onClick={() => navigate(`/destination/india/${card.slug}`)}
              >
                <span>Explore Packages</span>
                <img src={arrow} alt='' />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Pagination */}
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
