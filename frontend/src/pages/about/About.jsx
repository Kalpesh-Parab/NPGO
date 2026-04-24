import React, { useEffect, useState } from 'react';
import CommonHero from '../../components/commonHero/CommonHero';
import aboutHero from '../../assets/aboutHero.jpg';
import AboutFirst from './sections/aboutFirst/AboutFirst';
import HomeContact from '../home/sections/homeContact/HomeContact';
import AboutInfo from './sections/aboutInfo/AboutInfo';
import CorpGallery from '../corporate/sections/corpGallery/CorpGallery';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import { getHomepage } from '../../admin/services/homepageService';

const About = () => {
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
        title='About NPGO'
        backgroundType='image'
        backgroundSrc={aboutHero}
      />
      <AboutFirst />
      <CorpGallery />
      <AboutInfo />
      <HomeTesti data={homepageData?.testimonials} />

      <HomeContact />
    </>
  );
};

export default About;
