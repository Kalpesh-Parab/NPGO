import { useEffect, useState } from 'react';
import HomeHero from './sections/homeHero/HomeHero';
import HomeAbout from './sections/homeAbout/HomeAbout';
import PopularPackages from './sections/popularPackages/PopularPackages';
import HomeDestinations from './sections/homeDestinations/HomeDestinations';
import HomeExperience from './sections/homeExperience/HomeExperience';
import HomeMemories from './sections/homeMemories/HomeMemories';
import HomeCorporate from './sections/homeCorporate/HomeCorporate';
import HomeBike from './sections/homeBike/HomeBike';
import HomeGallery from './sections/homeGallery/HomeGallery';
import HomeTesti from './sections/homeTesti/HomeTesti';
import HomeBlogs from './sections/homeBlogs/HomeBlogs';
import HomeMerch from './sections/homeMerch/HomeMerch';
import HomeFAQ from './sections/homeFAQ/HomeFAQ';
import HomeContact from './sections/homeContact/HomeContact';

import './home.scss';
import { getHomepage } from '../../admin/services/homepageService';

const Home = () => {
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
      <HomeHero data={homepageData?.hero} />
      <HomeAbout data={homepageData?.about} />

      <PopularPackages mode='random' />
      <HomeDestinations />
      <HomeExperience />
      <HomeMemories />

      <HomeCorporate data={homepageData?.corporateGallery} />

      <HomeBike />

      <HomeGallery data={homepageData?.homeGallery} />

      <HomeTesti data={homepageData?.testimonials} />

      <HomeBlogs />
      <HomeMerch />

      <HomeFAQ data={homepageData?.faqs} />

      <HomeContact />
    </>
  );
};

export default Home;
