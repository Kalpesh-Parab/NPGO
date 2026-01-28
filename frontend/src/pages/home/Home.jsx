import HomeHero from './sections/homeHero/HomeHero';
import './home.scss';
import HomeAbout from './sections/homeAbout/HomeAbout';
import PopularPackages from './sections/popularPackages/PopularPackages';
import HomeDestinations from './sections/homeDestinations/homeDestinations';
import HomeExperience from './sections/homeExperience/HomeExperience';

const Home = () => {
  return (
    <>
      <HomeHero />
      <HomeAbout />
      <PopularPackages />
      <HomeDestinations />
      <HomeExperience />
    </>
  );
};

export default Home;
