import React from 'react';
import CommonHero from '../../components/commonHero/CommonHero';
import comm from '../../assets/common/comm.mp4';
import BlogExplore from './sections/blogExplore/BlogExplore';

const Blogs = () => {
  return (
    <>
      <CommonHero
        title='Travel Stories & Insights.'
        backgroundType='video'
        backgroundSrc={comm}
      />
      <BlogExplore />
    </>
  );
};

export default Blogs;
