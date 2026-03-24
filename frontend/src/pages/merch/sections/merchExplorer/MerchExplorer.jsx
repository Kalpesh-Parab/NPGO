import './merchExplorer.scss';
import { useEffect, useState } from 'react';
import API from '../../../../admin/services/api';

const MerchExplorer = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const PRODUCTS_PER_PAGE = 12;

  const fetchMerch = async () => {
    try {
      const res = await API.get(
        `/merch?page=${currentPage}&limit=${PRODUCTS_PER_PAGE}`,
      );

      setProducts(res.data.data);
      setTotalPages(res.data.pagination.pages); // 🔥 IMPORTANT
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMerch();
  }, [currentPage]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 700, behavior: 'smooth' });
    }
  };

  return (
    <section className='MerchExplorer'>
      <div className='top'>
        <h4>
          Curated merchandise inspired by exploration, adventure, and the spirit
          of travel.
        </h4>
      </div>

      <div className='products'>
        {products.map((merch) => (
          <a
            href={merch.affiliateLink}
            target='_blank'
            rel='noopener noreferrer'
            className='product'
            key={merch._id}
          >
            <div className='image'>
              <img src={merch.images?.[0]} alt={merch.title} />
            </div>

            <div className='pDetails'>
              <div className='pLeft'>
                <div className='title'>{merch.title}</div>
                <div className='desc'>{merch.description}</div>
              </div>
              <div className='price'>
                {merch.currency}
                {merch.price}
              </div>
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
