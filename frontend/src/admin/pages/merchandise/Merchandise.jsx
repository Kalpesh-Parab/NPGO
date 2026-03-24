import './merchandise.scss';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import { toast } from 'sonner';

const Merchandise = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    currency: '₹',
    images: [],
    category: '',
    affiliateLink: '',
    isActive: true,
  });

  const [merchList, setMerchList] = useState([]);

  // 🔥 Fetch
  const fetchMerch = async () => {
    try {
      const res = await API.get('/merch/admin/all');
      setMerchList(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMerch();
  }, []);

  // 🔥 Input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // 🔥 Upload (FIXED)
  const handleUpload = async (file) => {
    const toastId = toast.loading('Uploading image...');

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await API.post('/upload', data);

      const url = res.data.url;

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));

      toast.success('Upload successful', { id: toastId });
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
    }
  };

  // 🔥 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/merch', form);
      fetchMerch();

      setForm({
        title: '',
        description: '',
        price: '',
        currency: '₹',
        images: [],
        category: '',
        affiliateLink: '',
        isActive: true,
      });

      toast.success('Product added');
    } catch (err) {
      toast.error('Failed to add product');
    }
  };

  // 🔥 Delete
  const handleDelete = async (id) => {
    await API.delete(`/merch/${id}`);
    fetchMerch();
  };

  // 🔥 Toggle
  const toggleStatus = async (item) => {
    const toastId = toast.loading(
      `${item.isActive ? 'Deactivating' : 'Activating'} product...`,
    );

    try {
      await API.put(`/merch/${item._id}`, {
        isActive: !item.isActive,
      });

      toast.success(
        `Product ${item.isActive ? 'deactivated' : 'activated'} successfully`,
        { id: toastId },
      );

      fetchMerch();
    } catch (err) {
      toast.error('Failed to update status', { id: toastId });
    }
  };

  return (
    <div className='adminMerch'>
      {/* ================= FORM ================= */}
      <form className='merchForm' onSubmit={handleSubmit}>
        <h2>Add Merchandise</h2>

        <div className='grid'>
          <input
            name='title'
            placeholder='Title'
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name='price'
            type='number'
            placeholder='Price'
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name='category'
            placeholder='Category'
            value={form.category}
            onChange={handleChange}
          />

          <input
            name='affiliateLink'
            placeholder='Affiliate Link'
            value={form.affiliateLink}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name='description'
          placeholder='Description'
          value={form.description}
          onChange={handleChange}
        />

        {/* 🔥 Upload Images */}
        <div className='images'>
          <label className='uploadBox'>
            Upload Images
            <input
              type='file'
              hidden
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                files.forEach((file) => handleUpload(file));
              }}
            />
          </label>

          <div className='preview'>
            {form.images.map((img, i) => (
              <div className='imgWrap' key={i}>
                <img src={img} alt='' />

                <button
                  type='button'
                  onClick={() => {
                    const updated = form.images.filter((_, idx) => idx !== i);
                    setForm({ ...form, images: updated });
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className='actions'>
          <label>
            <input
              type='checkbox'
              name='isActive'
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>

          <button type='submit'>Add Product</button>
        </div>
      </form>

      {/* ================= LIST ================= */}
      <div className='merchList'>
        {merchList.map((item) => (
          <div className='card' key={item._id}>
            <img src={item.images?.[0]} alt='' />

            <div className='info'>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span>
                {item.currency}
                {item.price}
              </span>
            </div>

            <div className='cardActions'>
              <button onClick={() => toggleStatus(item)}>
                {item.isActive ? 'Deactivate' : 'Activate'}
              </button>

              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Merchandise;
