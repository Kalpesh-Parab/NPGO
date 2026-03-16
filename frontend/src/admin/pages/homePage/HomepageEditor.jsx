import { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import API from '../../services/api';
import './homepageEditor.scss';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableImage = ({ img, index, remove }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: img._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='imgBox'
    >
      <img src={img.url} alt='' />
      <button onClick={() => remove(index)}>Remove</button>
    </div>
  );
};
const HomepageEditor = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor));

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

  const handleCorporateDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.corporateGallery.images.findIndex(
          (img) => img._id === active.id,
        );

        const newIndex = prev.corporateGallery.images.findIndex(
          (img) => img._id === over.id,
        );

        return {
          ...prev,
          corporateGallery: {
            ...prev.corporateGallery,
            images: arrayMove(prev.corporateGallery.images, oldIndex, newIndex),
          },
        };
      });
    }
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

  const handleHomeGalleryDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.homeGallery.images.findIndex(
          (img) => img._id === active.id,
        );

        const newIndex = prev.homeGallery.images.findIndex(
          (img) => img._id === over.id,
        );

        return {
          ...prev,
          homeGallery: {
            ...prev.homeGallery,
            images: arrayMove(prev.homeGallery.images, oldIndex, newIndex),
          },
        };
      });
    }
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

  const handleTestimonialDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.testimonials.findIndex(
          (t) => t._id === active.id,
        );

        const newIndex = prev.testimonials.findIndex((t) => t._id === over.id);

        return {
          ...prev,
          testimonials: arrayMove(prev.testimonials, oldIndex, newIndex),
        };
      });
    }
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

  const removeFaq = (index) => {
    const updated = [...formData.faqs];
    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      faqs: updated,
    }));
  };
  const handleFaqDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFormData((prev) => {
        const oldIndex = prev.faqs.findIndex((f) => f._id === active.id);

        const newIndex = prev.faqs.findIndex((f) => f._id === over.id);

        return {
          ...prev,
          faqs: arrayMove(prev.faqs, oldIndex, newIndex),
        };
      });
    }
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

        <label className='uploadBtn'>
          <FaUpload />
          <span>Hero Video</span>
          <input
            type='file'
            hidden
            onChange={(e) => uploadHeroMedia(e.target.files[0])}
          />
        </label>

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

        {/* ABOUT IMAGE */}
        <label className='uploadBtn'>
          <FaUpload />
          <span>About Image</span>
          <input
            type='file'
            hidden
            onChange={(e) => uploadAboutImage(e.target.files[0])}
          />
        </label>

        <MediaPreview media={formData.about?.image} />

        {/* BUTTON TEXT */}
        <input
          placeholder='Button Text'
          value={formData.about?.buttonText || ''}
          onChange={(e) => handleChange('about', 'buttonText', e.target.value)}
        />

        {/* BUTTON LINK */}
        <input
          placeholder='Button Link'
          value={formData.about?.buttonLink || ''}
          onChange={(e) => handleChange('about', 'buttonLink', e.target.value)}
        />
      </div>

      {/* CORPORATE GALLERY */}
      <div className='section'>
        <h2>Corporate Gallery (Max 26)</h2>

        <input
          placeholder='Title'
          value={formData.corporateGallery?.title || ''}
          onChange={(e) =>
            handleChange('corporateGallery', 'title', e.target.value)
          }
        />

        <input
          placeholder='Typing Text'
          value={formData.corporateGallery?.typingText || ''}
          onChange={(e) =>
            handleChange('corporateGallery', 'typingText', e.target.value)
          }
        />

        <textarea
          placeholder='Bottom Heading'
          value={formData.corporateGallery?.bottomHeading || ''}
          onChange={(e) =>
            handleChange('corporateGallery', 'bottomHeading', e.target.value)
          }
        />

        <textarea
          placeholder='Bottom Description'
          value={formData.corporateGallery?.bottomDescription || ''}
          onChange={(e) =>
            handleChange(
              'corporateGallery',
              'bottomDescription',
              e.target.value,
            )
          }
        />

        <input
          placeholder='Button Text'
          value={formData.corporateGallery?.buttonText || ''}
          onChange={(e) =>
            handleChange('corporateGallery', 'buttonText', e.target.value)
          }
        />

        <input
          placeholder='Button Link'
          value={formData.corporateGallery?.buttonLink || ''}
          onChange={(e) =>
            handleChange('corporateGallery', 'buttonLink', e.target.value)
          }
        />

        <label className='uploadBtn'>
          <FaUpload />
          <span>Corporate Photos</span>
          <input
            type='file'
            multiple
            hidden
            onChange={(e) => addCorporateImages(e.target.files)}
          />
        </label>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleCorporateDragEnd}
        >
          <SortableContext
            items={formData.corporateGallery.images.map((img) => img._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='imageGrid'>
              {formData.corporateGallery.images?.map((img, i) => (
                <SortableImage
                  key={img._id}
                  img={img}
                  index={i}
                  remove={removeCorporateImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* HOME GALLERY */}
      <div className='section'>
        <h2>Home Gallery</h2>

        <label className='uploadBtn'>
          <FaUpload />
          <span>Gallery Photos</span>
          <input
            type='file'
            multiple
            hidden
            onChange={(e) => addHomeGalleryImages(e.target.files)}
          />
        </label>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleHomeGalleryDragEnd}
        >
          <SortableContext
            items={formData.homeGallery.images.map((img) => img._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className='imageGrid'>
              {formData.homeGallery.images.map((img, i) => (
                <SortableImage
                  key={img._id}
                  img={img}
                  index={i}
                  remove={removeHomeGalleryImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* TESTIMONIALS */}
      <div className='section'>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleTestimonialDragEnd}
        >
          <SortableContext
            items={formData.testimonials.map((t) => t._id)}
            strategy={verticalListSortingStrategy}
          >
            {formData.testimonials.map((t, i) => (
              <div key={t._id} className='card'>
                <h4>Testimonial {i + 1}</h4>

                <input
                  placeholder='Title'
                  value={t.title || ''}
                  onChange={(e) =>
                    updateTestimonial(i, 'title', e.target.value)
                  }
                />

                <textarea
                  placeholder='Review'
                  value={t.review || ''}
                  onChange={(e) =>
                    updateTestimonial(i, 'review', e.target.value)
                  }
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
                  onChange={(e) =>
                    updateTestimonial(i, 'rating', e.target.value)
                  }
                />

                <label className='uploadBtn'>
                  <FaUpload />
                  <span>Customer Photo</span>
                  <input
                    type='file'
                    hidden
                    onChange={(e) =>
                      uploadTestimonialPhoto(i, e.target.files[0])
                    }
                  />
                </label>

                <MediaPreview media={t.photo} />

                <label className='uploadBtn'>
                  <FaUpload />
                  <span>Profile Image</span>
                  <input
                    type='file'
                    hidden
                    onChange={(e) =>
                      uploadTestimonialProfile(i, e.target.files[0])
                    }
                  />
                </label>

                <MediaPreview media={t.profile} />

                <button
                  className='removeBtn'
                  onClick={() => removeTestimonial(i)}
                >
                  Remove
                </button>
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* FAQ */}
      <div className='section'>
        <h2>FAQs</h2>

        <button onClick={addFaq}>Add FAQ</button>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleFaqDragEnd}
        >
          <SortableContext
            items={formData.faqs.map((f) => f._id)}
            strategy={verticalListSortingStrategy}
          >
            {formData.faqs.map((faq, i) => (
              <div key={faq._id} className='card'>
                <div className='cardHeader'>
                  <span>FAQ {i + 1}</span>

                  <button className='removeBtn' onClick={() => removeFaq(i)}>
                    Delete
                  </button>
                </div>

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
          </SortableContext>
        </DndContext>
      </div>

      <button className='saveBtn' onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Save Homepage'}
      </button>
    </div>
  );
};

export default HomepageEditor;
