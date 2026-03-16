import { useState, useEffect } from 'react';
import API from '../../services/api';
import './homepageEditor.scss';

const HomepageEditor = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    hero: {
      heading: '',
      subHeading: '',
      buttonText: '',
      buttonLink: '',
      media: null,
    },
    about: {
      sectionTitle: '',
      heading: '',
      description: '',
      image: null,
      buttonText: '',
      buttonLink: '',
    },
    corporateGallery: {
      title: '',
      typingText: '',
      images: [],
      bottomHeading: '',
      bottomDescription: '',
      buttonText: '',
      buttonLink: '',
    },
    homeGallery: {
      title: '',
      description: '',
      images: [],
      bottomDescription: '',
      buttonText: '',
      buttonLink: '',
    },
    testimonials: [],
    faqs: [],
  });

  /* ==============================
     FETCH EXISTING HOMEPAGE DATA
  ============================== */
  useEffect(() => {
    fetchHomepage();
  }, []);

  const fetchHomepage = async () => {
    try {
      const res = await API.get('/homepage');
      if (res.data) setFormData(res.data);
    } catch (err) {
      console.error('Failed to fetch homepage', err);
    }
  };

  /* ==============================
     BASIC CHANGE HANDLER
  ============================== */
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  /* ==============================
     FILE UPLOAD
  ============================== */
  const uploadFile = async (file) => {
    setUploading(true);

    const data = new FormData();
    data.append('file', file);

    const res = await API.post('/upload', data);

    setUploading(false);
    return res.data;
  };

  /* ==============================
     HERO MEDIA
  ============================== */
  const uploadHeroMedia = async (file) => {
    const media = await uploadFile(file);
    handleChange('hero', 'media', media);
  };

  /* ==============================
     ABOUT IMAGE
  ============================== */
  const uploadAboutImage = async (file) => {
    const media = await uploadFile(file);
    handleChange('about', 'image', media);
  };

  /* ==============================
     CORPORATE GALLERY (MAX 26)
  ============================== */
  const addCorporateImages = async (files) => {
    if (formData.corporateGallery.images.length >= 26) {
      alert('Corporate gallery limit is 26 images');
      return;
    }

    const uploaded = [];

    for (let file of files) {
      if (formData.corporateGallery.images.length + uploaded.length >= 26)
        break;

      const media = await uploadFile(file);
      uploaded.push(media);
    }

    setFormData((prev) => ({
      ...prev,
      corporateGallery: {
        ...prev.corporateGallery,
        images: [...prev.corporateGallery.images, ...uploaded],
      },
    }));
  };

  const removeCorporateImage = (index) => {
    const updated = [...formData.corporateGallery.images];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      corporateGallery: {
        ...prev.corporateGallery,
        images: updated,
      },
    }));
  };

  /* ==============================
     HOME GALLERY (UNLIMITED)
  ============================== */
  const addHomeGalleryImages = async (files) => {
    const uploaded = [];

    for (let file of files) {
      const media = await uploadFile(file);
      uploaded.push(media);
    }

    setFormData((prev) => ({
      ...prev,
      homeGallery: {
        ...prev.homeGallery,
        images: [...prev.homeGallery.images, ...uploaded],
      },
    }));
  };

  const removeHomeGalleryImage = (index) => {
    const updated = [...formData.homeGallery.images];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      homeGallery: {
        ...prev.homeGallery,
        images: updated,
      },
    }));
  };

  /* ==============================
     TESTIMONIALS
  ============================== */
  const addTestimonial = () => {
    setFormData((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          photo: null,
          title: '',
          review: '',
          rating: '',
          name: '',
          profile: null,
        },
      ],
    }));
  };

  const updateTestimonial = (index, field, value) => {
    const updated = [...formData.testimonials];
    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      testimonials: updated,
    }));
  };

  const uploadTestimonialPhoto = async (index, file) => {
    const media = await uploadFile(file);

    const updated = [...formData.testimonials];
    updated[index].photo = media;

    setFormData((prev) => ({
      ...prev,
      testimonials: updated,
    }));
  };
  const uploadTestimonialProfile = async (index, file) => {
    const media = await uploadFile(file);

    const updated = [...formData.testimonials];
    updated[index].profile = media;

    setFormData((prev) => ({
      ...prev,
      testimonials: updated,
    }));
  };

  const removeTestimonial = (index) => {
    const updated = [...formData.testimonials];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      testimonials: updated,
    }));
  };

  /* ==============================
     FAQ
  ============================== */
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const updateFaq = (index, field, value) => {
    const updated = [...formData.faqs];
    updated[index][field] = value;

    setFormData((prev) => ({
      ...prev,
      faqs: updated,
    }));
  };

  /* ==============================
     SUBMIT
  ============================== */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await API.put('/homepage', formData);
      alert('Homepage updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving homepage');
    } finally {
      setLoading(false);
    }
  };

  /* ==============================
     MEDIA PREVIEW COMPONENT
  ============================== */
  const MediaPreview = ({ media }) => {
    if (!media?.url) return null;

    if (media.type === 'video') {
      return <video src={media.url} width='200' autoPlay />;
    }

    return <img src={media.url} width='200' alt='preview' />;
  };

  return (
    <div className='HomepageEditor'>
      <h1>Homepage Editor</h1>

      {uploading && <p className='uploadLoader'>Uploading media...</p>}

      {/* HERO */}
      <div className='section'>
        <h2>Hero</h2>

        <input
          placeholder='Heading'
          value={formData.hero?.heading || ''}
          onChange={(e) => handleChange('hero', 'heading', e.target.value)}
        />

        <textarea
          placeholder='Subheading'
          value={formData.hero?.subHeading || ''}
          onChange={(e) => handleChange('hero', 'subHeading', e.target.value)}
        />

        <input
          placeholder='Button Text'
          value={formData.hero?.buttonText || ''}
          onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
        />

        <input
          placeholder='Button Link'
          value={formData.hero?.buttonLink || ''}
          onChange={(e) => handleChange('hero', 'buttonLink', e.target.value)}
        />

        <input
          type='file'
          onChange={(e) => uploadHeroMedia(e.target.files[0])}
        />

        <MediaPreview media={formData.hero?.media} />
      </div>

      {/* ABOUT */}
      <div className='section'>
        <h2>About</h2>

        <input
          placeholder='Section Title'
          value={formData.about?.sectionTitle || ''}
          onChange={(e) =>
            handleChange('about', 'sectionTitle', e.target.value)
          }
        />

        <input
          placeholder='Heading'
          value={formData.about?.heading || ''}
          onChange={(e) => handleChange('about', 'heading', e.target.value)}
        />

        <textarea
          placeholder='Description'
          value={formData.about?.description || ''}
          onChange={(e) => handleChange('about', 'description', e.target.value)}
        />

        <input
          type='file'
          onChange={(e) => uploadAboutImage(e.target.files[0])}
        />

        <MediaPreview media={formData.about?.image} />
      </div>

      {/* CORPORATE GALLERY */}
      <div className='section'>
        <h2>Corporate Gallery (Max 26)</h2>

        <input
          type='file'
          multiple
          onChange={(e) => addCorporateImages(e.target.files)}
        />

        <div className='imageGrid'>
          {formData.corporateGallery.images?.map((img, i) => (
            <div key={i} className='imgBox'>
              <img src={img.url} alt='' />
              <button onClick={() => removeCorporateImage(i)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* HOME GALLERY */}
      <div className='section'>
        <h2>Home Gallery</h2>

        <input
          type='file'
          multiple
          onChange={(e) => addHomeGalleryImages(e.target.files)}
        />

        <div className='imageGrid'>
          {formData.homeGallery.images?.map((img, i) => (
            <div key={i} className='imgBox'>
              <img src={img.url} alt='' />
              <button onClick={() => removeHomeGalleryImage(i)}>Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className='section'>
        <h2>Testimonials</h2>

        <button onClick={addTestimonial}>Add Testimonial</button>

        {formData.testimonials.map((t, i) => (
          <div key={i} className='card'>
            <h4>Testimonial {i + 1}</h4>

            <input
              placeholder='Title'
              value={t.title || ''}
              onChange={(e) => updateTestimonial(i, 'title', e.target.value)}
            />

            <textarea
              placeholder='Review'
              value={t.review || ''}
              onChange={(e) => updateTestimonial(i, 'review', e.target.value)}
            />

            <input
              placeholder='Customer Name'
              value={t.name || ''}
              onChange={(e) => updateTestimonial(i, 'name', e.target.value)}
            />

            <input
              type='number'
              placeholder='Rating (1-5)'
              value={t.rating || ''}
              onChange={(e) => updateTestimonial(i, 'rating', e.target.value)}
            />

            <label>Customer Photo</label>
            <input
              type='file'
              onChange={(e) => uploadTestimonialPhoto(i, e.target.files[0])}
            />

            <MediaPreview media={t.photo} />

            <label>Profile Image (Company / Avatar)</label>
            <input
              type='file'
              onChange={(e) => uploadTestimonialProfile(i, e.target.files[0])}
            />

            <MediaPreview media={t.profile} />

            <button className='removeBtn' onClick={() => removeTestimonial(i)}>
              Remove Testimonial
            </button>
          </div>
        ))}
      </div>

      {/* FAQ */}
      <div className='section'>
        <h2>FAQs</h2>

        <button onClick={addFaq}>Add FAQ</button>

        {formData.faqs.map((faq, i) => (
          <div key={i} className='card'>
            <input
              placeholder='Question'
              value={faq.question || ''}
              onChange={(e) => updateFaq(i, 'question', e.target.value)}
            />

            <textarea
              placeholder='Answer'
              value={faq.answer || ''}
              onChange={(e) => updateFaq(i, 'answer', e.target.value)}
            />
          </div>
        ))}
      </div>

      <button className='saveBtn' onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save Homepage'}
      </button>
    </div>
  );
};

export default HomepageEditor;
