import React, { useEffect, useState } from 'react';
import DestHero from './sections/destHero/DestHero';
import DestSelector from './sections/destSelector/DestSelector';
import DestMemories from './sections/destMemories/DestMemories';
import DestExplore from './sections/destExplore/DestExplore';
import DestIntExplore from './sections/destIntExplore/DestIntExplore';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';

const Destination = () => {
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
      <DestHero />
      <DestSelector />
      <DestMemories />
      <DestExplore />
      <DestIntExplore />
      <HomeTesti data={homepageData?.testimonials} />
      <HomeContact />
      <HomeExperience />
      <PopularPackages mode='random' />
    </>
  );
};

export default Destination;
