import React, { useEffect, useState } from 'react';
import CommonHero from '../../components/commonHero/CommonHero';
import comm from '../../assets/corporateHero.png';
import CorpFirst from './sections/corpFirst/CorpFirst';
import DestTravelExp from '../destinationListing/sections/destTravelExp/DestTravelExp';
import CorpWhyNPGO from './sections/corpWhyNPGO/CorpWhyNPGO';
import CorpGallery from './sections/corpGallery/CorpGallery';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import { getHomepage } from '../../admin/services/homepageService';

const Corporate = () => {
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
  return (
    <>
      <CommonHero
        title='Business Meets Travel.'
        backgroundType='image'
        backgroundSrc={comm}
      />
      <CorpFirst />
      <DestTravelExp />
      <CorpWhyNPGO />
      <CorpGallery />
      <PopularPackages mode='random' />

      <HomeTesti data={homepageData?.testimonials} />

      <HomeContact />
    </>
  );
};

export default Corporate;
