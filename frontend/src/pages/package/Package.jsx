import './package.scss';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPackageBySlug } from '../../admin/services/packageService';
import { getEventBySlug } from '../../admin/services/eventService';
import { toast } from 'sonner';

import PackHero from './sections/packHero/PackHero';
import PackGallery from './sections/packGallery/PackGallery';
import PackItinerary from './sections/packItinerary/PackItinerary';
import PackInclusions from './sections/packInclusions/PackInclusions';

import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';

import { scrollToContact } from '../../utils/scrollToContact';

const Package = () => {
  const { slug } = useParams();
  const location = useLocation();

  const [data, setData] = useState(null);

  // 🔥 detect type
  const isEvent = location.pathname.includes('/event');

  useEffect(() => {
    const fetchData = async () => {
      const toastId = toast.loading(
        isEvent ? 'Loading event...' : 'Loading package...',
      );

      try {
        const res = isEvent
          ? await getEventBySlug(slug)
          : await getPackageBySlug(slug);

        setData(res.data.data || res.data);

        toast.dismiss(toastId);
      } catch (err) {
        toast.error(
          isEvent ? 'Failed to load event' : 'Failed to load package',
          { id: toastId },
        );
      }
    };

    fetchData();
  }, [slug, isEvent]);

  if (!data) return null;

  return (
    <>
      <PackHero data={data} />
      <PackGallery data={data} />
      <PackItinerary data={data} />
      <PackInclusions data={data.inclusions} />

      <div className='booking'>
        <button onClick={scrollToContact}>Book Now</button>
      </div>

      <HomeTesti />
      <HomeContact />
      <HomeExperience />

      <PopularPackages mode='random' />
    </>
  );
};

export default Package;
