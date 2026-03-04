import './merchExplorer.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import merch1 from '../../../../assets/merch1.png';
import merch2 from '../../../../assets/merch2.png';
import merch3 from '../../../../assets/merch3.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MerchExplorer = () => {
  const PRODUCTS_PER_PAGE = 12;
  // 🔥 Mock Data (Later replace with API data)
  const merchs = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    photo: [merch1, merch2, merch3][index % 3],
    title: `NPGO Cap ${index + 1}`,
    price: '150',
    desc: 'Premium travel inspired merchandise',
    link: 'https://www.amazon.in/', // 🔥 Mock Affiliate Link
  }));

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(merchs.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = merchs.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 700, behavior: 'smooth' });
    }
  };
  const navigate = useNavigate();

  return (
    <section className='MerchExplorer'>
      <div className='top'>
        <h4>
          Curated merchandise inspired by exploration, adventure, and the spirit
          of travel.
        </h4>
      </div>

      <div className='products'>
        {currentProducts.map((merch) => (
          <a
            href={merch.link}
            target='_blank'
            rel='noopener noreferrer'
            className='product'
            key={merch.id}
          >
            <div className='image'>
              <img src={merch.photo} alt={merch.title} />
            </div>

            <div className='pDetails'>
              <div className='pLeft'>
                <div className='title'>{merch.title}</div>
                <div className='desc'>{merch.desc}</div>
              </div>
              <div className='price'>₹{merch.price}</div>
            </div>
          </a>
        ))}
      </div>

      {/* 🔥 Pagination */}
      <div className='pagination'>
        <button
          className='navBtn'
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`pageBtn ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className='navBtn'
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default MerchExplorer;
