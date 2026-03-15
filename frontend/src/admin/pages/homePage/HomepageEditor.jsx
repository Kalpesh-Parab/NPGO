import { useState } from 'react';
import API from "../../services/api";
import './homepageEditor.scss';

const HomepageEditor = () => {
  const [loading, setLoading] = useState(false);

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

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleUpload = async (file) => {
    const uploadData = new FormData();
    uploadData.append('file', file);

    const res = await API.post('/upload', uploadData);
    return res.data;
  };

  const addCorporateImages = async (files) => {
    const uploaded = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);

      const res = await API.post('/upload', formData);

      uploaded.push(res.data);
    }

    setFormData((prev) => ({
      ...prev,
      corporateGallery: {
        ...prev.corporateGallery,
        images: [...prev.corporateGallery.images, ...uploaded],
      },
    }));
  };

  const addHomeGalleryImage = async (file) => {
    const media = await handleUpload(file);

    setFormData((prev) => ({
      ...prev,
      homeGallery: {
        ...prev.homeGallery,
        images: [...prev.homeGallery.images, media],
      },
    }));
  };

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

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [
        ...prev.faqs,
        {
          question: '',
          answer: '',
        },
      ],
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

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await API.put('/homepage', formData);

      alert('Homepage saved successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving homepage');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='HomepageEditor'>
      <h1>Homepage Editor</h1>

      {/* HERO */}

      <div className='section'>
        <h2>Hero</h2>

        <input
          placeholder='Heading'
          onChange={(e) => handleChange('hero', 'heading', e.target.value)}
        />

        <textarea
          placeholder='Subheading'
          onChange={(e) => handleChange('hero', 'subHeading', e.target.value)}
        />

        <input
          placeholder='Button Text'
          onChange={(e) => handleChange('hero', 'buttonText', e.target.value)}
        />

        <input
          placeholder='Button Link'
          onChange={(e) => handleChange('hero', 'buttonLink', e.target.value)}
        />

        <input
          type='file'
          onChange={async (e) => {
            const media = await handleUpload(e.target.files[0]);
            handleChange('hero', 'media', media);
          }}
        />
      </div>

      {/* ABOUT */}

      <div className='section'>
        <h2>About</h2>

        <input
          placeholder='Section Title'
          onChange={(e) =>
            handleChange('about', 'sectionTitle', e.target.value)
          }
        />

        <input
          placeholder='Heading'
          onChange={(e) => handleChange('about', 'heading', e.target.value)}
        />

        <textarea
          placeholder='Description'
          onChange={(e) => handleChange('about', 'description', e.target.value)}
        />

        <input
          placeholder='Button Text'
          onChange={(e) => handleChange('about', 'buttonText', e.target.value)}
        />

        <input
          placeholder='Button Link'
          onChange={(e) => handleChange('about', 'buttonLink', e.target.value)}
        />

        <input
          type='file'
          onChange={async (e) => {
            const media = await handleUpload(e.target.files[0]);
            handleChange('about', 'image', media);
          }}
        />
      </div>

      {/* CORPORATE GALLERY */}

      <div className='section'>
        <h2>Corporate Gallery</h2>

        <input
          placeholder='Title'
          onChange={(e) =>
            handleChange('corporateGallery', 'title', e.target.value)
          }
        />

        <input
          placeholder='Typing Text'
          onChange={(e) =>
            handleChange('corporateGallery', 'typingText', e.target.value)
          }
        />

        <input
          type='file'
          multiple
          onChange={(e) => addCorporateImages(e.target.files)}
        />
      </div>

      {/* HOME GALLERY */}

      <div className='section'>
        <h2>Home Gallery</h2>

        <input
          placeholder='Title'
          onChange={(e) => handleChange('homeGallery', 'title', e.target.value)}
        />

        <textarea
          placeholder='Description'
          onChange={(e) =>
            handleChange('homeGallery', 'description', e.target.value)
          }
        />

        <input
          type='file'
          onChange={(e) => addHomeGalleryImage(e.target.files[0])}
        />
      </div>

      {/* TESTIMONIALS */}

      <div className='section'>
        <h2>Testimonials</h2>

        <button onClick={addTestimonial}>Add Testimonial</button>

        {formData.testimonials.map((t, i) => (
          <div key={i} className='card'>
            <input
              placeholder='Title'
              onChange={(e) => updateTestimonial(i, 'title', e.target.value)}
            />

            <textarea
              placeholder='Review'
              onChange={(e) => updateTestimonial(i, 'review', e.target.value)}
            />

            <input
              placeholder='Name'
              onChange={(e) => updateTestimonial(i, 'name', e.target.value)}
            />

            <input
              placeholder='Rating'
              onChange={(e) => updateTestimonial(i, 'rating', e.target.value)}
            />
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
              onChange={(e) => updateFaq(i, 'question', e.target.value)}
            />

            <textarea
              placeholder='Answer'
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
