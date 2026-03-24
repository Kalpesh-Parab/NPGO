import './blogsEditor.scss';
import { useEffect, useState } from 'react';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import API from '../../services/api';

const BlogsEditor = () => {
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs/admin/all');
      setBlogs(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='adminBlogs'>
      <BlogForm
        editingBlog={editingBlog}
        setEditingBlog={setEditingBlog}
        refreshBlogs={fetchBlogs}
      />

      <BlogList
        blogs={blogs}
        setEditingBlog={setEditingBlog}
        refreshBlogs={fetchBlogs}
      />
    </div>
  );
};

export default BlogsEditor;
