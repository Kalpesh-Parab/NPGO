import './homeDestinations.scss';
import arrow from '../../../../assets/arrow.svg';
import fallback from '../../../../assets/logo.png';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { INDIA_PATHS } from '../../../../admin/pages/activationZone/data/IndiaPath';
import API from '../../../../admin/services/api';
import StateShape from './StateShape';

const HomeDestinations = () => {
  const navigate = useNavigate();

  const SELECTED_STATES = [
    'IN-MH',
    'IN-UT',
    'IN-GJ',
    'IN-HP',
    'IN-KL',
    'IN-MP',
  ];

  const DESC_MAP = {
    'IN-MH': 'From beaches to hill stations and vibrant cities.',
    'IN-UT': 'Land of gods, mountains, and spiritual journeys.',
    'IN-GJ': 'Culture, deserts, and stunning heritage sites.',
    'IN-HP': 'Snowy peaks, valleys, and peaceful retreats.',
    'IN-KL': 'Backwaters, greenery, and serene escapes.',
    'IN-MP': 'Forests, wildlife, and ancient heritage.',
  };

  const [destinations, setDestinations] = useState([]);

  const fetchData = async () => {
    try {
      const res = await API.get('/destinations/country/IN');
      let data = res.data?.data || res.data;

      data = data.filter((d) => SELECTED_STATES.includes(d.code));

      const finalData = await Promise.all(
        data.map(async (item) => {
          const slug = item.name.toLowerCase().replace(/\s+/g, '-');

          let packageCount = 0;

          try {
            const pkgRes = await API.get(
              `/packages/by-location?country=india&destination=${slug}`,
            );

            const pkgData = Array.isArray(pkgRes.data)
              ? pkgRes.data
              : pkgRes.data?.data || [];

            packageCount = pkgData.length;
          } catch {}

          return {
            name: item.name,
            code: item.code,
            slug,
            media: item.media || fallback,
            mediaType: item.mediaType || 'image',
            packages: packageCount,
            desc: DESC_MAP[item.code],
          };
        }),
      );

      setDestinations(finalData);
    } catch (err) {
      console.error('HomeDestinations error', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className='HomeDestinations'>
      <div className='top'>
        <h4>Destination Packages</h4>

        <div className='button' onClick={() => navigate('/dest')}>
          <span>View All Destinations</span>
          <img src={arrow} alt='' />
        </div>
      </div>

      <div className='title'>Explore handpicked destinations across India</div>

      <div className='titleDesc'>
        From breathtaking natural landscapes and iconic landmarks to vibrant
        cities and hidden local treasures, NPGO helps you discover places that
        inspire every kind of traveler.
      </div>
      <div className='buttonMob' onClick={() => navigate('/dest')}>
        <span>View All Destinations</span>
        <img src={arrow} alt='' />
      </div>

      <div className='destinationCards'>
        {destinations.map((dest, index) => {
          const pathD = INDIA_PATHS[dest.code];
          const clipId = `clip-${index}-${dest.code}`;

          return (
            <div
              className='destinationCard'
              key={dest.code}
              onClick={() => navigate(`/destination/india/${dest.slug}`)}
            >
              <div className='svgWrapper'>
                <StateShape
                  pathD={pathD}
                  media={dest.media}
                  mediaType={dest.mediaType}
                  clipId={clipId}
                />
              </div>

              <div className='info'>
                <div className='destTitle'>{dest.name}</div>
                <div className='destDesc'>{dest.desc}</div>
              </div>

              <div className='hoverInfo'>
                <div className='packages'>{dest.packages} Packages</div>
                <div className='viewAll'>View All</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeDestinations;
