import HomeHero from './sections/homeHero/HomeHero';
import './home.scss';
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

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <PopularPackages />
      <HomeDestinations />
      <HomeExperience />
      <HomeMemories />
      <HomeCorporate />
      <HomeBike />
      <HomeGallery />
      <HomeTesti />
      <HomeBlogs />
      <HomeMerch />
    </>
  );
};

export default Home;
