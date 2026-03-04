import './blogExplore.scss';
import blog1 from '../../../../assets/blog1.png';
import blog2 from '../../../../assets/blog2.png';
import blog3 from '../../../../assets/blog3.png';
import profile1 from '../../../../assets/profile1.png';
import { useState } from 'react';

const BlogExplore = () => {
  const BLOGS_PER_PAGE = 9;

  // 🔥 Mock Data (Repeat to simulate multiple pages)
  const Blogs = Array.from({ length: 21 }, (_, index) => ({
    id: index + 1,
    title:
      index % 3 === 0
        ? 'The Ultimate Street Food Crawl: Searching for the Perfect Vada Pav in South Mumbai'
        : index % 3 === 1
          ? 'Mist, Mountains, and Coffee Estates: A Complete Guide to Luxury Homestays in Coorg'
          : 'Lost in Time: Exploring the Architectural Wonders and Golden Sunsets of Ancient Hampi',
    author:
      index % 3 === 0
        ? 'Arjun Mehta'
        : index % 3 === 1
          ? 'Priya Nair'
          : 'Rohan Das',
    photo: [blog1, blog2, blog3][index % 3],
    profile: profile1,
    date: 'February 05, 2026',
    domain: ['Food', 'Stay', 'Travel'][index % 3],
  }));

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(Blogs.length / BLOGS_PER_PAGE);

  const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
  const currentBlogs = Blogs.slice(startIndex, startIndex + BLOGS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 700, behavior: 'smooth' });
    }
  };

  // ✅ Title truncation helper
  const truncateTitle = (text, limit = 70) => {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  };

  return (
    <section className='BlogExplore'>
      <h3>
        Curated journeys, expert tips, and inspiring stories from the world of
        refined travel.
      </h3>
      <div className='blogCards'>
        {currentBlogs.map((blog) => (
          <div className='blogCard' key={blog.id}>
            <div className='image'>
              <img src={blog.photo} alt={blog.title} />
            </div>

            <div className='details'>
              <div className='domain'>{blog.domain}</div>

              <div className='title'>{truncateTitle(blog.title)}</div>

              <div className='author'>
                <div className='left'>
                  <img
                    src={blog.profile}
                    alt={blog.author}
                    className='profile'
                  />
                  <div className='name'>{blog.author}</div>
                </div>
                <div className='date'>{blog.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Pagination (Same as MerchExplorer) */}
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

export default BlogExplore;
