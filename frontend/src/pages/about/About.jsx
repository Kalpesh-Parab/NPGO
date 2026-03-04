import React from 'react';
import CommonHero from '../../components/commonHero/CommonHero';
import aboutHero from '../../assets/aboutHero.jpg';
import AboutFirst from './sections/aboutFirst/AboutFirst';
import PackGallery from '../package/sections/packGallery/PackGallery';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import AboutInfo from './sections/aboutInfo/AboutInfo';

const About = () => {
  return (
    <>
      <CommonHero
        title='About NPGO'
        backgroundType='image'
        backgroundSrc={aboutHero}
      />
      <AboutFirst />
      <PackGallery />
      <AboutInfo/>
      <HomeTesti />
      <HomeContact/>
    </>
  );
};

export default About;
