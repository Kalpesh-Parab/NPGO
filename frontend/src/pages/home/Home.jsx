import HomeHero from './sections/homeHero/HomeHero';
import './home.scss';
import HomeAbout from './sections/homeAbout/HomeAbout';
import PopularPackages from './sections/popularPackages/PopularPackages';
import HomeDestinations from './sections/homeDestinations/HomeDestinations';
import HomeExperience from './sections/homeExperience/HomeExperience';
import HomeMemories from './sections/homeMemories/HomeMemories';
import HomeCorporate from './sections/homeCorporate/HomeCorporate';
import HomeBike from './sections/homeBike/HomeBike';

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
    </>
  );
};

export default Home;
