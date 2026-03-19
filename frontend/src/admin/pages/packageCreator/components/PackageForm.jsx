import './packageForm.scss';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import API from '../../../services/api';

const PackageForm = ({ selected, onSuccess, initialData }) => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    currency: 'INR',
    description: '',

    heroMedia: { type: 'image', url: '' },

    gallery: [],

    itinerary: [],

    types: [''],
    included: [''],
    notIncluded: [''],

    isActive: true,
  });

  // -----------------------------
  // HELPERS
  // -----------------------------
  const getMediaType = (file) => {
    if (file.type.startsWith('video')) return 'video';
    return 'image';
  };

  const slugify = (text) => text.toLowerCase().trim().replace(/\s+/g, '-');

  // -----------------------------
  // BASIC HANDLERS
  // -----------------------------
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  const addField = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeField = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, [field]: updated }));
  };

  // -----------------------------
  // UPLOAD HANDLER
  // -----------------------------
  const handleUpload = async (file, type, index = null) => {
    const toastId = toast.loading('Uploading media...');

    try {
      const data = new FormData();
      data.append('file', file);

      const res = await API.post('/upload', data);

      const media = {
        ...res.data,
        type: getMediaType(file),
        caption: '',
      };

      toast.success('Upload successful', { id: toastId });

      if (type === 'hero') {
        setForm((prev) => ({ ...prev, heroMedia: media }));
      }

      if (type === 'gallery') {
        setForm((prev) => ({
          ...prev,
          gallery: [...prev.gallery, media],
        }));
      }

      if (type === 'itinerary-media') {
        setForm((prev) => {
          const updated = [...prev.itinerary];
          updated[index].media.push(media);

          return { ...prev, itinerary: updated };
        });
      }
    } catch (err) {
      toast.error('Upload failed', { id: toastId });
    }
  };

  // -----------------------------
  // ITINERARY
  // -----------------------------
  const addDay = () => {
    setForm((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          id: prev.itinerary.length + 1,
          day: `Day ${prev.itinerary.length + 1}`,
          title: '',
          description: [{ heading: '', content: '' }],
          media: [],
        },
      ],
    }));
  };

  const removeDay = (index) => {
    const updated = form.itinerary.filter((_, i) => i !== index);
    setForm({ ...form, itinerary: updated });
  };

  const updateDayField = (index, field, value) => {
    const updated = [...form.itinerary];
    updated[index][field] = value;
    setForm({ ...form, itinerary: updated });
  };

  const updateDescription = (dayIndex, descIndex, field, value) => {
    const updated = [...form.itinerary];
    updated[dayIndex].description[descIndex][field] = value;
    setForm({ ...form, itinerary: updated });
  };

  const addDescriptionBlock = (dayIndex) => {
    const updated = [...form.itinerary];
    updated[dayIndex].description.push({ heading: '', content: '' });
    setForm({ ...form, itinerary: updated });
  };

  const removeDescription = (dayIndex, descIndex) => {
    const updated = [...form.itinerary];
    updated[dayIndex].description.splice(descIndex, 1);
    setForm({ ...form, itinerary: updated });
  };

  // -----------------------------
  // SUBMIT
  // -----------------------------
  const handleSubmit = async () => {
    // 🔥 basic validation (small but powerful)
    if (!form.title || !form.price) {
      toast.error('Title and Price are required');
      return;
    }

    const payload = {
      title: form.title,
      slug: initialData?.slug || slugify(form.title),
      price: Number(form.price),
      currency: form.currency,
      description: form.description,

      heroMedia: form.heroMedia,
      gallery: form.gallery,
      itinerary: form.itinerary,

      types: form.types.filter(Boolean),

      inclusions: {
        included: form.included.filter(Boolean),
        notIncluded: form.notIncluded.filter(Boolean),
      },

      isActive: form.isActive,

      country: selected.type === 'country' ? selected._id : selected.countryId,

      destination: selected.type === 'destination' ? selected._id : null,
    };

    const toastId = toast.loading(
      initialData ? 'Updating package...' : 'Creating package...',
    );

    try {
      if (initialData) {
        await API.put(`/packages/${initialData._id}`, payload);
        toast.success('Package updated', { id: toastId });
      } else {
        await API.post('/packages', payload);
        toast.success('Package created', { id: toastId });
      }

      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong', {
        id: toastId,
      });
    }
  };

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        price: initialData.price || '',
        currency: initialData.currency || 'INR',
        description: initialData.description || '',

        heroMedia: initialData.heroMedia || { type: 'image', url: '' },

        gallery: initialData.gallery || [],
        itinerary: initialData.itinerary || [],

        types: initialData.types?.length ? initialData.types : [''],

        included: initialData.inclusions?.included?.length
          ? initialData.inclusions.included
          : [''],

        notIncluded: initialData.inclusions?.notIncluded?.length
          ? initialData.inclusions.notIncluded
          : [''],

        isActive:
          typeof initialData.isActive === 'boolean'
            ? initialData.isActive
            : true,
      });
    }
  }, [initialData]);
  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className='package-form'>
      <h3>{initialData ? 'Edit Package' : 'Create Package'}</h3>

      {/* ================= BASIC ================= */}
      <div className='section'>
        <h4>Basic Info</h4>

        <input
          placeholder='Package Title'
          value={form.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />

        <input
          type='number'
          placeholder='Price'
          value={form.price}
          onChange={(e) => handleChange('price', e.target.value)}
        />

        <textarea
          placeholder='Description'
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      {/* ================= HERO ================= */}
      <div className='section'>
        <h4>Hero Media</h4>

        <label className='upload-box'>
          Upload Hero
          <input
            type='file'
            hidden
            onChange={(e) => handleUpload(e.target.files[0], 'hero')}
          />
        </label>

        {form.heroMedia.url &&
          (form.heroMedia.type === 'image' ? (
            <img src={form.heroMedia.url} />
          ) : (
            <video src={form.heroMedia.url} controls />
          ))}
      </div>

      {/* ================= GALLERY ================= */}
      <div className='section'>
        <h4>Gallery</h4>

        <label className='upload-box'>
          Upload Gallery Media
          <input
            type='file'
            hidden
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              files.forEach((file) => handleUpload(file, 'gallery'));
            }}
          />
        </label>

        {form.gallery.map((item, i) => (
          <div key={i}>
            {item.type === 'image' ? (
              <img src={item.url} width={100} />
            ) : (
              <video src={item.url} width={100} />
            )}

            <input
              placeholder='Caption'
              value={item.caption}
              onChange={(e) => {
                const updated = [...form.gallery];
                updated[i].caption = e.target.value;
                setForm({ ...form, gallery: updated });
              }}
            />

            <button
              className='danger'
              onClick={() => {
                const updated = form.gallery.filter((_, idx) => idx !== i);
                setForm({ ...form, gallery: updated });
                toast.info('Media removed');
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ================= TYPES ================= */}
      <div className='section'>
        <h4>Types</h4>

        {form.types.map((type, i) => (
          <div key={i}>
            <input
              value={type}
              onChange={(e) => handleArrayChange('types', i, e.target.value)}
            />
            <button onClick={() => removeField('types', i)}>✕</button>
          </div>
        ))}

        <button onClick={() => addField('types')}>+ Add Type</button>
      </div>

      {/* ================= ITINERARY ================= */}
      <div className='section'>
        <h4>Itinerary</h4>

        {form.itinerary.map((day, i) => (
          <div key={i} className='day'>
            <h5>{day.day}</h5>

            <input
              placeholder='Title'
              value={day.title}
              onChange={(e) => updateDayField(i, 'title', e.target.value)}
            />

            {day.description.map((desc, j) => (
              <div key={j}>
                <input
                  placeholder='Heading'
                  value={desc.heading}
                  onChange={(e) =>
                    updateDescription(i, j, 'heading', e.target.value)
                  }
                />
                <textarea
                  placeholder='Content'
                  value={desc.content}
                  onChange={(e) =>
                    updateDescription(i, j, 'content', e.target.value)
                  }
                />

                <button
                  className='danger'
                  onClick={() => removeDescription(i, j)}
                >
                  ✕ Remove
                </button>
              </div>
            ))}

            <button onClick={() => addDescriptionBlock(i)}>
              + Add Description
            </button>

            {/* MEDIA */}
            <label className='upload-box small'>
              Upload Day Media
              <input
                type='file'
                hidden
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  files.forEach((file) =>
                    handleUpload(file, 'itinerary-media', i),
                  );
                }}
              />
            </label>

            {day.media.map((m, k) => (
              <div key={k}>
                {m.type === 'image' ? (
                  <img src={m.url} width={80} />
                ) : (
                  <video src={m.url} width={80} />
                )}

                <input
                  placeholder='Caption'
                  value={m.caption}
                  onChange={(e) => {
                    const updated = [...form.itinerary];
                    updated[i].media[k].caption = e.target.value;
                    setForm({ ...form, itinerary: updated });
                  }}
                />
              </div>
            ))}

            <button className='danger' onClick={() => removeDay(i) }>
              Remove Day
            </button>
          </div>
        ))}

        <button onClick={addDay}>+ Add Day</button>
      </div>

      {/* ================= INCLUSIONS ================= */}
      <div className='section'>
        <h4>Inclusions</h4>

        <h5>Included</h5>
        {form.included.map((item, i) => (
          <div key={i}>
            <input
              value={item}
              onChange={(e) => handleArrayChange('included', i, e.target.value)}
            />
            <button onClick={() => removeField('included', i)}>✕</button>
          </div>
        ))}
        <button onClick={() => addField('included')}>+ Add Included</button>

        <h5>Not Included</h5>
        {form.notIncluded.map((item, i) => (
          <div key={i}>
            <input
              value={item}
              onChange={(e) =>
                handleArrayChange('notIncluded', i, e.target.value)
              }
            />
            <button onClick={() => removeField('notIncluded', i)}>✕</button>
          </div>
        ))}
        <button onClick={() => addField('notIncluded')}>
          + Add Not Included
        </button>
      </div>

      {/* ================= SETTINGS ================= */}
      <div className='section'>
        <h4>Settings</h4>

        <label>
          <input
            type='checkbox'
            checked={form.isActive}
            onChange={(e) => handleChange('isActive', e.target.checked)}
          />
          Active Package
        </label>
      </div>

      <button className='submit' onClick={handleSubmit}>
        {initialData ? 'Update Package' : 'Create Package'}
      </button>
    </div>
  );
};

export default PackageForm;
