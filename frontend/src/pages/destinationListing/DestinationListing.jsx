import React from 'react';
import DestListHero from './sections/destListHero/DestListHero';
// import comm from "../../assets/destination/hero.mp4"
import comm from '../../assets/destination/hero.jpg';
import DestListFilter from './sections/destListFilter/DestListFilter';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import DestPackages from './sections/destPackages/DestPackages';
import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';
import DestTravelExp from './sections/destTravelExp/DestTravelExp';
import DestIntExplore from '../destination/sections/destIntExplore/DestIntExplore';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
const DestinationListing = () => {
  const packages = [
    {
      image: p1,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 4.5,
      price: 4000,
      link: '/package',
    },
    {
      image: p2,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 5,
      price: 4000,
      link: '/package',
    },
    {
      image: p3,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 3.7,
      price: 4000,
      link: '/package',
    },
    {
      image: p4,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 4,
      price: 4000,
      link: '/package',
    },
    {
      image: p2,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 5,
      price: 4000,
      link: '/package',
    },
    {
      image: p4,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 4,
      price: 4000,
      link: '/package',
    },
    {
      image: p2,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 5,
      price: 4000,
      link: '/package',
    },
    {
      image: p3,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 3.7,
      price: 4000,
      link: '/package',
    },
  ];
  return (
    <>
      <DestListHero
        title='Explore Destinations'
        subTitle='Discover handpicked destinations across India and beyond, curated for unforgettable travel experiences.'
        backgroundType='image'
        backgroundSrc={comm}
      />
      <DestListFilter />
      <DestPackages title='Maharashtra' packages={packages} />
          <DestTravelExp />
          <DestIntExplore />
          <HomeTesti />
          <HomeContact />
          <HomeExperience />
          <PopularPackages/>
    </>
  );
};

export default DestinationListing;
