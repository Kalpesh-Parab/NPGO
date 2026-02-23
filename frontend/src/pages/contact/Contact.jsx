import React from 'react';
import CommonHero from '../../components/commonHero/CommonHero';
import com from '../../assets/common/com.png';
import comm from '../../assets/common/comm.mp4';
import HomeContact from '../home/sections/homeContact/HomeContact';

const Contact = () => {
  return (
    <>
      <CommonHero
        title='NPGO for your support'
        backgroundType='video'
        backgroundSrc={comm}
      />
      <HomeContact/>
    </>
  );
};

export default Contact;
