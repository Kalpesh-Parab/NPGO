import './events.scss';
import comm from '../../assets/common/comm.mp4';
import CommonHero from '../../components/commonHero/CommonHero';
import EventsGallery from './sections/eventsGallery/EventsGallery';
import DestTravelExp from '../destinationListing/sections/destTravelExp/DestTravelExp';
import HomeTesti from '../home/sections/homeTesti/HomeTesti';
import HomeContact from '../home/sections/homeContact/HomeContact';
import HomeExperience from '../home/sections/homeExperience/HomeExperience';
import PopularPackages from '../home/sections/popularPackages/PopularPackages';
import EventsExplorer from './sections/eventsExplorer/EventsExplorer';

import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';
const Events = () => {
  const events = [
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
      <CommonHero
        title='NPGO Events'
        subtitle='Celebrate unforgettable moments with curated travel and event experiences.'
        backgroundType='video'
        backgroundSrc={comm}
      />
      <section className='first'>
        <div className='left'>Events That Go Beyond Logistics</div>
        <div className='right'>
          At NPGO, we design and manage corporate and experiential events that
          combine seamless planning with meaningful experiences. From
          strategy-driven corporate offsites to incentive trips and large-scale
          events, we ensure every journey is professionally executed and
          thoughtfully curated.
        </div>
      </section>
      <EventsGallery />
      <EventsExplorer events={events} />
      <DestTravelExp />
      <HomeTesti />
      <HomeContact />
      <HomeExperience />
      <PopularPackages mode='random' />
    </>
  );
};

export default Events;
