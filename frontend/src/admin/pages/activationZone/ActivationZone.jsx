import './activationZone.scss';
import API from '../../services/api';
import { useEffect, useState } from 'react';
import {
  getCountries,
  getDestinationsByCountry,
  toggleCountry,
  toggleDestination,
} from '../../services/activationService';
import { toast } from 'sonner';

import ToggleSwitch from './components/ToggleSwitch';
import EntityCard from './components/EntityCard';

import {
  uploadFile,
  updateDestinationMedia,
  updateCountryMedia,
} from '../../services/activationService';
import SingleStatePreview from './components/SingleStatePreview';

const ActivationZone = () => {
  const [mode, setMode] = useState('domestic'); // domestic | international
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [packageCount, setPackageCount] = useState(0);

  const titles = [
    'Meri Marzi Zone',
    'Yahan Sab Band Hai',
    'Abhi Mood Nahi Hai',
    'Control Room: On/Off Ka Game',
    'Kisko Zinda Rakhein?',
  ];

  const handleUpload = async () => {
    if (!file) return toast.error('Select file first');

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      // 🔥 Upload to Cloudinary
      const res = await uploadFile(formData);

      const mediaUrl = res.data.url;

      // 🔥 BULLETPROOF detection
      let mediaType = 'image';

      if (
        res.data.resource_type === 'video' ||
        mediaUrl.includes('.mp4') ||
        mediaUrl.includes('.webm')
      ) {
        mediaType = 'video';
      }
      // 🔥 Decide API
      if (mode === 'domestic' && selectedCountry) {
        await updateDestinationMedia(selectedEntity.code, {
          media: mediaUrl,
          mediaType,
        });
      } else {
        await updateCountryMedia(selectedEntity.code, {
          media: mediaUrl,
          mediaType,
        });
      }

      toast.success('Media updated successfully');

      setShowModal(false);
      setFile(null);

      fetchCountries();
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };
  const handleEdit = (entity) => {
    setSelectedEntity(entity);
    setShowModal(true);
  };

  useEffect(() => {
    const random = titles[Math.floor(Math.random() * titles.length)];
    setPageTitle(random);
  }, []);
  // 🔥 Fetch all countries
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await getCountries();
      setCountries(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // 🔥 Filter based on mode
  const filteredCountries = countries.filter((c) => c.type === mode);

  // 🔥 Handle country click
  const handleCountryClick = async (country) => {
    setSelectedCountry(country);

    if (country.type === 'domestic') {
      try {
        const res = await getDestinationsByCountry(country.code);
        setDestinations(res.data.data);
      } catch {
        toast.error('Failed to fetch destinations');
      }
    }
  };

  // 🔥 Toggle country
  const handleCountryToggle = async (country) => {
    try {
      await toggleCountry(country.code, !country.isActive);

      toast.success(
        `${country.name} ${country.isActive ? 'deactivated' : 'activated'}`,
      );

      fetchCountries();
      setSelectedCountry(null);
      setDestinations([]);
    } catch {
      toast.error('Failed to update country');
    }
  };

  // 🔥 Toggle destination
  const handleDestinationToggle = async (destination) => {
    try {
      await toggleDestination(destination.code, !destination.isActive);

      toast.success(
        `${destination.name} ${
          destination.isActive ? 'deactivated' : 'activated'
        }`,
      );

      // refresh destinations
      const res = await getDestinationsByCountry(selectedCountry.code);
      setDestinations(res.data.data);
    } catch {
      toast.error('Failed to update destination');
    }
  };

  const fetchPackageCount = async (entity) => {
    try {
      let url = '';

      if (mode === 'domestic') {
        url = `/packages/by-location?country=india&destination=${entity.name.toLowerCase().replace(/\s+/g, '-')}`;
      } else {
        url = `/packages/by-location?country=${entity.name.toLowerCase()}`;
      }

      const res = await API.get(url);

      const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

      setPackageCount(data.length);
    } catch (err) {
      console.error(err);
      setPackageCount(0);
    }
  };
  useEffect(() => {
    if (selectedEntity) {
      fetchPackageCount(selectedEntity);
    }
  }, [selectedEntity]);

  return (
    <div className='activation-zone'>
      {/* 🔥 HEADER */}
      <div className='header'>
        <h1>{pageTitle}</h1>

        <ToggleSwitch mode={mode} setMode={setMode} />
      </div>

      {/* 🔥 BODY */}
      <div className='content'>
        {/* LEFT: Countries */}
        <div className='panel'>
          <h2>{mode === 'domestic' ? 'States (India)' : 'Countries'}</h2>

          <div className='grid'>
            {filteredCountries.map((country) => (
              <EntityCard
                key={country._id}
                item={country}
                mapType={mode === 'international' ? 'world' : 'india'} // 🔥 FIX
                onClick={() => handleCountryClick(country)}
                onToggle={() => handleCountryToggle(country)}
                isSelected={selectedCountry?._id === country._id}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: Destinations */}
        {mode === 'domestic' && selectedCountry && (
          <div className='panel'>
            <h2>{selectedCountry.name} Destinations</h2>

            <div className='grid'>
              {destinations.map((dest) => (
                <EntityCard
                  key={dest._id}
                  item={dest}
                  mapType='india' // 🔥 always india for states
                  isParentActive={selectedCountry?.isActive}
                  onToggle={() => handleDestinationToggle(dest)}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          </div>
        )}
        {showModal && (
          <div className='modal'>
            <div className='modal-content'>
              <h3>{selectedEntity?.name}</h3>

              {/* <video
                src={selectedEntity?.media}
                autoPlay
                loop
                controls
                alt=''
              /> */}
              {/* 🔥 PACKAGE COUNT */}
              <p>📦 {packageCount} Packages</p>
              {mode === 'domestic' ? (
                <SingleStatePreview entity={selectedEntity} mode={mode} />
              ) : (
                <p>International preview coming soon 🌍</p>
              )}

              {/* 🔥 FILE INPUT */}
              <input type='file' onChange={(e) => setFile(e.target.files[0])} />

              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
              </button>

              <button onClick={() => setShowModal(false)}>Close</button>
              <button
                onClick={async () => {
                  await deleteDestinationMedia(selectedEntity.code);
                  toast.success('Media deleted');

                  setShowModal(false);
                  fetchCountries();
                }}
              >
                Delete Media
              </button>
            </div>
          </div>
        )}
      </div>

      {loading && <p className='loading'>Loading...</p>}
    </div>
  );
};

export default ActivationZone;
