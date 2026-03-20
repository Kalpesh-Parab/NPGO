import React, { useEffect, useState } from 'react';
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
import { useParams } from 'react-router-dom';
import API from '../../admin/services/api';
const DestinationListing = () => {
  const { country, destination } = useParams();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        let url = `/packages/by-location?country=${country}`;

        if (destination) {
          url += `&destination=${destination}`;
        }

        const res = await API.get(url);

        const transformed = res.data.map((pkg) => ({
          image: pkg.heroMedia?.url,
          title: pkg.title,
          desc: pkg.description,
          ratings: 4.5, // temp
          price: pkg.price,
          link: `/package/${pkg.slug}`,
        }));

        setPackages(transformed);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackages();
  }, [country, destination]);
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
      <PopularPackages />
    </>
  );
};

export default DestinationListing;
