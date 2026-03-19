import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPackageBySlug } from '../../admin/services/packageService';
import { toast } from 'sonner';
import PackHero from './sections/packHero/PackHero';
import PackGallery from './sections/packGallery/PackGallery';
import PackItinerary from './sections/packItinerary/PackItinerary';
import PackInclusions from './sections/packInclusions/PackInclusions';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';

const Package = () => {
  const { slug } = useParams();
  const [packageData, setPackageData] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      const toastId = toast.loading('Loading package...');

      try {
        const res = await getPackageBySlug(slug);
        setPackageData(res.data.data || res.data);

        toast.dismiss(toastId); // better than success toast
      } catch (err) {
        toast.error('Failed to load package', { id: toastId });
      }
    };

    fetchPackage();
  }, [slug]);

  if (!packageData) return null;

  return (
    <>
      <PackHero data={packageData} />
      <PackGallery data={packageData} />
      <PackItinerary data={packageData} />
      <PackInclusions data={packageData.inclusions} />

      <HomeTesti />
      <HomeContact />
      <HomeExperience />

      {/* 🔥 CONTEXTUAL
      <PopularPackages
        mode='similar'
        destinationId={packageData?.destination?._id}
      /> */}

      {/* 🔥 GLOBAL */}
      <PopularPackages mode='random' />
    </>
  );
};

export default Package;