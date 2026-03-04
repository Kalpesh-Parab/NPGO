import React from 'react';
import CommonHero from '../../components/commonHero/CommonHero';
import aboutHero from '../../assets/aboutHero.jpg';
import AboutFirst from './sections/aboutFirst/AboutFirst';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import AboutInfo from './sections/aboutInfo/AboutInfo';
import CorpGallery from '../corporate/sections/corpGallery/CorpGallery';

const About = () => {
  return (
    <>
      <CommonHero
        title='About NPGO'
        backgroundType='image'
        backgroundSrc={aboutHero}
      />
      <AboutFirst />
      <CorpGallery/>
      <AboutInfo />
      <HomeTesti />
      <HomeContact/>
    </>
  );
};

export default About;
