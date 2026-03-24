import API from '../../../services/api';

const BlogList = ({ blogs, setEditingBlog, refreshBlogs }) => {
  const handleDelete = async (id) => {
    await API.delete(`/blogs/${id}`);
    refreshBlogs(); // 🔥 instant update
  };

  return (
    <div className='blogList'>
      <h2>Recent Blogs</h2>

      <div className='cards'>
        {blogs.map((blog) => (
          <div key={blog._id} className='card'>
            <img src={blog.thumbnail} alt='' />

            <h3>{blog.title}</h3>

            <button onClick={() => setEditingBlog(blog)}>Edit</button>

            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
 