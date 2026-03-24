import { useEffect, useState } from 'react';
import API from '../../../services/api';
import { toast } from 'sonner';

const BlogForm = ({ editingBlog, setEditingBlog, refreshBlogs }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    thumbnail: '',
    content: [],
    isActive: true,
  });

  useEffect(() => {
    if (editingBlog) {
      setForm(editingBlog);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editingBlog]);

  const handleThumbnailUpload = async (file) => {
    const toastId = toast.loading('Uploading thumbnail...');

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await API.post('/upload', data);

      setForm((prev) => ({
        ...prev,
        thumbnail: res.data.url,
      }));

      toast.success('Thumbnail uploaded', { id: toastId });
    } catch {
      toast.error('Upload failed', { id: toastId });
    }
  };
  // 🔥 Upload
  const handleUpload = async (file, type = 'image') => {
    const toastId = toast.loading('Uploading...');

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await API.post('/upload', data);

      const url = res.data.url;

      addMediaBlock(url, type);

      toast.success('Upload successful', { id: toastId });
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
    }
  };

  // ➕ Add Text Block
  const addTextBlock = () => {
    setForm({
      ...form,
      content: [...form.content, { type: 'text', text: '' }],
    });
  };

  // ➕ Add Media Block
  const addMediaBlock = (url, type) => {
    setForm({
      ...form,
      content: [...form.content, { type: 'media', media: { type, url } }],
    });
  };

  const handleSubmit = async () => {
    const toastId = toast.loading('Saving blog...');

    try {
      if (editingBlog) {
        await API.put(`/blogs/${editingBlog._id}`, form);
        toast.success('Blog updated', { id: toastId });
      } else {
        await API.post('/blogs', form);
        toast.success('Blog created', { id: toastId });
      }

      setEditingBlog(null);

      setForm({
        title: '',
        description: '',
        author: '',
        category: '',
        thumbnail: '',
        content: [],
        isActive: true,
      });
      refreshBlogs();
      // 🔥 IMPORTANT → trigger refresh
      if (window.refreshBlogs) window.refreshBlogs();
    } catch (err) {
      toast.error('Error saving blog', { id: toastId });
    }
  };

  return (
    <div className='blogForm'>
      <h2>{editingBlog ? 'Edit Blog' : 'Create Blog'}</h2>

      <input
        placeholder='Title'
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder='Description'
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        placeholder='Author'
        value={form.author}
        onChange={(e) => setForm({ ...form, author: e.target.value })}
      />

      <input
        placeholder='Category'
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      {/* Thumbnail Upload */}
      <div className='thumbnailUpload'>
        <label>
          Upload Thumbnail
          <input
            type='file'
            hidden
            onChange={(e) => handleThumbnailUpload(e.target.files[0])}
          />
        </label>

        {form.thumbnail && (
          <img src={form.thumbnail} alt='' className='thumbPreview' />
        )}
      </div>

      {/* 🔥 CONTENT BUILDER */}
      <div className='contentBuilder'>
        <button onClick={addTextBlock}>+ Text</button>

        <input
          type='file'
          onChange={(e) => handleUpload(e.target.files[0], 'image')}
        />

        <input
          placeholder='Video URL (YouTube/Insta)'
          onBlur={(e) => {
            if (e.target.value) addMediaBlock(e.target.value, 'video');
          }}
        />
        <input
          type='file'
          accept='video/*'
          onChange={(e) => handleUpload(e.target.files[0], 'video')}
        />

        {/* Preview Blocks */}
        {form.content.map((block, i) => (
          <div key={i}>
            {block.type === 'text' && (
              <textarea
                value={block.text}
                onChange={(e) => {
                  const updated = [...form.content];
                  updated[i].text = e.target.value;
                  setForm({ ...form, content: updated });
                }}
              />
            )}

            {block.type === 'media' && (
              <div>
                {block.media.type === 'image' ? (
                  <img src={block.media.url} width='150' />
                ) : (
                  <video src={block.media.url} width='150' controls />
                )}
              </div>
            )}
            <button
              type='button'
              onClick={() => {
                const updated = form.content.filter((_, idx) => idx !== i);
                setForm({ ...form, content: updated });
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit}>
        {editingBlog ? 'Update' : 'Create'}
      </button>
    </div>
  );
};

export default BlogForm;
