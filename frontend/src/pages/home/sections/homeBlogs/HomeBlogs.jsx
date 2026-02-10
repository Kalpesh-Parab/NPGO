import './homeBlogs.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';
import blog1 from '../../../../assets/blog1.png';
import blog2 from '../../../../assets/blog2.png';
import blog3 from '../../../../assets/blog3.png';
import profile1 from '../../../../assets/profile1.png';

const HomeBlogs = () => {
  const navigate = useNavigate();

  const Blogs = [
    {
      title:
        'The Ultimate Street Food Crawl: Searching for the Perfect Vada Pav in South Mumbai',
      author: 'Arjun Mehta',
      photo: blog1,
      profile: profile1,
      date: 'February 05, 2026',
      domain: 'Food',
    },
    {
      title:
        'Mist, Mountains, and Coffee Estates: A Complete Guide to Luxury Homestays in Coorg',
      author: 'Priya Nair',
      photo: blog2,
      profile: profile1,
      date: 'January 15, 2026',
      domain: 'Stay',
    },
    {
      title:
        'Lost in Time: Exploring the Architectural Wonders and Golden Sunsets of Ancient Hampi',
      author: 'Rohan Das',
      photo: blog3,
      profile: profile1,
      date: 'December 20, 2025',
      domain: 'Travel',
    },
  ];

  // ✅ Title truncation helper
  const truncateTitle = (text, limit = 70) => {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  };

  return (
    <section className='HomeBlogs'>
      <div className='top'>
        <h4>Blogs</h4>
        <div className='button' onClick={() => navigate('/destination')}>
          <span>View All Blogs</span>
          <img src={arrow} alt='' />
        </div>
      </div>

      <h3>
        NPGO offers end-to-end corporate travel solutions for businesses and
        organizations. We specialize in planning
      </h3>

      <div className='desc'>
        From logistics and stays to activities and on-ground coordination, we
        handle every detail to ensure a smooth, professional, and memorable
        corporate journey.
      </div>

      <div className='blogCards'>
        {Blogs.map((blog, i) => (
          <div className='blogCard' key={i}>
            <div className='image'>
              <img src={blog.photo} alt='' />
            </div>

            <div className='details'>
              <div className='domain'>{blog.domain}</div>

              {/* ✅ Truncated title */}
              <div className='title'>{truncateTitle(blog.title)}</div>

              <div className='author'>
                <div className='left'>
                  <img src={blog.profile} alt='' className='profile' />
                  <div className='name'>{blog.author}</div>
                </div>
                <div className='date'>{blog.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBlogs;
