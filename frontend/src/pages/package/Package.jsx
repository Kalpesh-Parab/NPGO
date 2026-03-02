import './package.scss';
import PackGallery from './sections/packGallery/PackGallery';
import PackHero from './sections/packHero/PackHero';
import PackItinerary from './sections/packItinerary/PackItinerary';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import PackInclusions from './sections/packInclusions/PackInclusions';
const Package = () => {

  const packageInclusions = {
  included: [
    "Accommodation on sharing basis",
    "Breakfast & dinner throughout the trip",
    "All internal transportation",
    "Experienced trip coordinator",
    "Assistance during temple visits",
    "Basic first-aid support"
  ],
  notIncluded: [
    "Helicopter tickets to Kedarnath",
    "Pony / palki / porter charges",
    "Personal expenses",
    "Travel insurance",
    "Any meals not mentioned above"
  ]
  };
  
  return (
    <>
      <PackHero />
      <PackGallery />
      <PackItinerary />
      <PackInclusions data={packageInclusions} />
      <HomeTesti />
      <HomeContact />
      <HomeExperience />
      <PopularPackages />
    </>
  );
};

export default Package;
