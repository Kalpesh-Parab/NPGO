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
import { useEffect, useState } from 'react';
import { getAllEvents } from '../../admin/services/eventService';
import { toast } from 'sonner';
import { getHomepage } from '../../admin/services/homepageService';

const Events = () => {
  const [events, setEvents] = useState([]);
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

  const getDisplayMedia = (ev) => {
    if (ev.heroMedia?.type === 'image' && ev.heroMedia?.url) {
      return ev.heroMedia.url;
    }

    if (ev.gallery?.length) {
      const image = ev.gallery.find((m) => m.type === 'image');
      if (image) return image.url;
      if (ev.gallery[0]?.url) return ev.gallery[0].url;
    }

    if (ev.itinerary?.length) {
      for (const day of ev.itinerary) {
        if (day.media?.length) {
          const image = day.media.find((m) => m.type === 'image');
          if (image) return image.url;
          if (day.media[0]?.url) return day.media[0].url;
        }
      }
    }

    return '/fallback.jpg';
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const toastId = toast.loading('Loading events...');

      try {
        const res = await getAllEvents();

        const rawEvents = res.data;

        // 🔥 MAP BACKEND → UI FORMAT
        const formatted = rawEvents.map((ev) => ({
          image: getDisplayMedia(ev),
          title: ev.title,
          desc: ev.description || '',
          ratings: 4.5, // temp (you don’t have rating in DB yet)
          price: ev.price,
          link: `/event/${ev.slug}`,
        }));

        setEvents(formatted);

        toast.dismiss(toastId);
      } catch (err) {
        toast.error('Failed to load events', { id: toastId });
      }
    };

    fetchEvents();
  }, []);

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
      <HomeTesti data={homepageData?.testimonials} />

      <HomeContact />
      <HomeExperience />
      <PopularPackages mode='random' />
    </>
  );
};

export default Events;
