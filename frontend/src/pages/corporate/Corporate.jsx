import React from 'react';
import CommonHero from '../../components/commonHero/CommonHero';
import comm from '../../assets/corporateHero.png';
import CorpFirst from './sections/corpFirst/CorpFirst';
import DestTravelExp from '../destinationListing/sections/destTravelExp/DestTravelExp';
import CorpWhyNPGO from './sections/corpWhyNPGO/CorpWhyNPGO';
import CorpGallery from './sections/corpGallery/CorpGallery';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';

const Corporate = () => {
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
      <PopularPackages />
      <HomeTesti />
      <HomeContact/>
    </>
  );
};

export default Corporate;
