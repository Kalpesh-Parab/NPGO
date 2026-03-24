import './blogExplore.scss';
import { useEffect, useState } from 'react';
import API from '../../../../admin/services/api';

const BlogExplore = () => {
  const BLOGS_PER_PAGE = 9;

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const fetchBlogs = async (page = 1) => {
    try {
      const res = await API.get(`/blogs?page=${page}&limit=${BLOGS_PER_PAGE}`);

      setBlogs(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedBlog]);
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const getYoutubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);

      if (urlObj.hostname.includes('youtube.com')) {
        const id = urlObj.searchParams.get('v');
        return `https://www.youtube.com/embed/${id}?rel=0`;
      }

      if (urlObj.hostname.includes('youtu.be')) {
        const id = urlObj.pathname.slice(1);
        return `https://www.youtube.com/embed/${id}?rel=0`;
      }

      return url;
    } catch {
      return url;
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 700, behavior: 'smooth' });
    }
  };

  return (
    <section className='BlogExplore'>
      <h3>
        Curated journeys, expert tips, and inspiring stories from the world of
        refined travel.
      </h3>

      <div className='blogCards'>
        {blogs.map((blog) => (
          <div
            className='blogCard'
            key={blog._id}
            onClick={() => setSelectedBlog(blog)}
          >
            <div className='image'>
              <img src={blog.thumbnail} alt={blog.title} />
            </div>

            <div className='details'>
              <div className='domain'>{blog.category}</div>

              <div className='title'>{blog.title}</div>

              <div className='author'>
                <div className='left'>
                  <div className='name'>{blog.author}</div>
                </div>
                <div className='date'>
                  {new Date(blog.createdAt).toDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {selectedBlog && (
          <div className='blogModal'>
            <div className='overlay' onClick={() => setSelectedBlog(null)} />

            <div className='modalContent'>
              <button
                className='closeBtn'
                onClick={() => setSelectedBlog(null)}
              >
                ✕
              </button>

              <div className='modalInner'>
                <img
                  src={selectedBlog.thumbnail}
                  alt={selectedBlog.title}
                  className='heroImage'
                />

                <h2>{selectedBlog.title}</h2>

                <div className='meta'>
                  <span>{selectedBlog.author}</span>
                  <span>{new Date(selectedBlog.createdAt).toDateString()}</span>
                </div>

                <div className='content'>
                  {selectedBlog.content?.map((block, i) => {
                    if (block.type === 'text') {
                      return <p key={i}>{block.text}</p>;
                    }

                    if (block.type === 'media') {
                      if (block.media.type === 'image') {
                        return (
                          <img
                            key={i}
                            src={block.media.url}
                            alt=''
                            className='contentMedia'
                          />
                        );
                      }

                      if (block.media.type === 'video') {
                        const isYoutube =
                          block.media.url.includes('youtube') ||
                          block.media.url.includes('youtu.be');

                        return isYoutube ? (
                          <iframe
                            key={i}
                            src={getYoutubeEmbedUrl(block.media.url)}
                            className='contentMedia'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                            allowFullScreen
                            referrerPolicy='strict-origin-when-cross-origin'
                          />
                        ) : (
                          <video
                            key={i}
                            src={block.media.url}
                            controls
                            className='contentMedia'
                          />
                        );
                      }
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className='pagination'>
        <button onClick={() => goToPage(currentPage - 1)}>←</button>

        {[...Array(totalPages)].map((_, i) => (
          <button key={i} onClick={() => goToPage(i + 1)}>
            {i + 1}
          </button>
        ))}

        <button onClick={() => goToPage(currentPage + 1)}>→</button>
      </div>
    </section>
  );
};

export default BlogExplore;
