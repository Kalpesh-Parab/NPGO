import React, { useEffect, useState } from 'react';
import './destinationListing.scss';
import DestListHero from './sections/destListHero/DestListHero';
import comm from '../../assets/destination/hero.jpg';
import DestListFilter from './sections/destListFilter/DestListFilter';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import DestPackages from './sections/destPackages/DestPackages';
import DestTravelExp from './sections/destTravelExp/DestTravelExp';
import DestIntExplore from '../destination/sections/destIntExplore/DestIntExplore';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../admin/services/api';
import { getHomepage } from '../../admin/services/homepageService';

const DestinationListing = () => {
  const { country, destination } = useParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [packages, setPackages] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  const navigate = useNavigate();

  const [homepageData, setHomepageData] = useState(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const res = await getHomepage();
        setHomepageData(res.data);
      } catch (err) {
        console.error('Failed to fetch homepage', err);
      }
    };

    fetchHomepage();
  }, []);

  // 🔥 MEDIA FALLBACK
  const getDisplayMedia = (pkg) => {
    if (pkg.heroMedia?.type === 'image' && pkg.heroMedia?.url) {
      return pkg.heroMedia.url;
    }

    if (pkg.gallery?.length) {
      const image = pkg.gallery.find((m) => m.type === 'image');
      if (image) return image.url;
      if (pkg.gallery[0]?.url) return pkg.gallery[0].url;
    }

    if (pkg.itinerary?.length) {
      for (const day of pkg.itinerary) {
        if (day.media?.length) {
          const image = day.media.find((m) => m.type === 'image');
          if (image) return image.url;
          if (day.media[0]?.url) return day.media[0].url;
        }
      }
    }

    return '/fallback.jpg';
  };

  // 🔥 UNIVERSAL NORMALIZER (IMPORTANT FIX)
  const normalizePackage = (pkg) => ({
    image: getDisplayMedia(pkg),
    title: pkg.title || '',
    desc: pkg.description || '',
    ratings: 4.5,
    price: pkg.price || 0,
    link: `/package/${pkg.slug}`,
    types: pkg.types || [],
  });

  // 🔥 FETCH ALL PACKAGES (for search)
  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const res = await API.get('/packages');
        const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

        setAllPackages(data.map(normalizePackage)); // ✅ normalized
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllPackages();
  }, []);

  // 🔥 FETCH LOCATION PACKAGES
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let url = `/packages/by-location?country=${country}`;
        if (destination) url += `&destination=${destination}`;

        const res = await API.get(url);

        const packageArray = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];

        // ✅ extract types
        const allTypes = [
          ...new Set(packageArray.flatMap((pkg) => pkg.types || [])),
        ];
        setPackageTypes(allTypes);

        setPackages(packageArray.map(normalizePackage)); // ✅ normalized
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackages();
  }, [country, destination]);

  // 🔥 DECIDE BASE DATASET
  const basePackages = searchQuery ? allPackages : packages;

  // 🔥 FILTER ONLY (NO REMAP ❌)
  const filteredPackages = basePackages.filter((pkg) => {
    const matchesType = selectedType ? pkg.types.includes(selectedType) : true;

    const matchesSearch = searchQuery
      ? pkg.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesType && matchesSearch;
  });

  const formatTitle = (slug) => {
    if (!slug) return 'All Packages';

    return slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // 🔥 RESET FILTERS ON ROUTE CHANGE
  useEffect(() => {
    setSelectedType('');
    setSearchQuery('');
  }, [country, destination]);

  return (
    <>
      <DestListHero
        title='Explore Destinations'
        subTitle='Discover handpicked destinations across India and beyond, curated for unforgettable travel experiences.'
        backgroundType='image'
        backgroundSrc={comm}
      />

      <DestListFilter
        packageTypes={packageTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        allPackages={allPackages}
        currentCountry={country} // 🔥 New: Passing URL country parameter
        currentDest={destination} // 🔥 New: Passing URL destination parameter
      />

      {filteredPackages.length === 0 ? (
        <div className='noResults'>
          <h3>Didn’t find what you were looking for?</h3>
          <p>We’ve got your back — create your own custom trip </p>
          <button
            onClick={() =>
              navigate('/customise', {
                state: { from: window.location.pathname },
              })
            }
          >
            Create Custom Trip
          </button>
          <h4>Packages you may like</h4>
          <PopularPackages mode='random' />
        </div>
      ) : (
        <DestPackages
          title={formatTitle(destination || country)}
          packages={filteredPackages}
        />
      )}

      <DestTravelExp />
      <DestIntExplore />
      <HomeTesti data={homepageData?.testimonials} />

      <HomeContact />
      <HomeExperience />
      <PopularPackages mode='random' />
    </>
  );
};

export default DestinationListing;
