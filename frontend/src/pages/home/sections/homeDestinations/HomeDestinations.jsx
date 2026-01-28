import './homeDestinations.scss';
import arrow from '../../../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
import mh from '../../../../assets/Maharashtra.svg';
import gj from '../../../../assets/Gujrat.svg';
import pb from '../../../../assets/Punjab.svg';
import mp from '../../../../assets/MP.svg';
import up from '../../../../assets/UP.svg';
import mhHover from '../../../../assets/MaharashtraHover.svg';
import v1 from '../../../../assets/v1.mp4';
import v2 from '../../../../assets/v2.mp4';

const HomeDestinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      image: mh,
      title: 'Maharashtra',
      desc: 'From breathtaking natural landscapes and iconic landmarks to vibrant cities and hidden local treasures.',
      packages: 12,
      hoverImage: mhHover,
    },
    {
      image: mh,
      title: 'Maharashtra',
      desc: 'From breathtaking natural landscapes and iconic landmarks to vibrant cities and hidden local treasures.',
      packages: 12,
      hoverVideo: v1,
    },
    {
      image: gj,
      title: 'Gujrat',
      desc: 'From breathtaking natural landscapes and iconic landmarks to vibrant cities and hidden local treasures.',
      packages: 10,
      hoverVideo: v2,
    },
    {
      image: pb,
      title: 'Punjab',
      desc: 'From breathtaking natural landscapes and iconic landmarks to vibrant cities and hidden local treasures.',
      packages: 6,
    },
    {
      image: mp,
      title: 'Madhya Pradesh',
      desc: 'From breathtaking natural landscapes and iconic landmarks to vibrant cities and hidden local treasures.',
      packages: 9,
    },
    {
      image: up,
      title: 'Uttar Pradesh',
      desc: 'From breathtaking natural landscapes and iconic landmarks to vibrant cities and hidden local treasures.',
      packages: 11,
    },
  ];

  return (
    <section className='HomeDestinations'>
      <div className='top'>
        <h4>Destination Packages</h4>
        <div className='button' onClick={() => navigate('/destination')}>
          <span>View More Packages</span>
          <img src={arrow} alt='' />
        </div>
      </div>

      <div className='title'>
        Explore handpicked destinations across the globe
      </div>

      <div className='titleDesc'>
        From breathtaking natural landscapes and iconic landmarks to vibrant
        cities and hidden local treasures, NPGO helps you discover places that
        inspire every kind of traveler.
      </div>

      <div className='destinationCards'>
        {destinations.map((dest, index) => (
          <div className='destinationCard' key={index}>
            {(dest.hoverImage || dest.hoverVideo) && (
              <div
                className='hoverMedia'
                style={{
                  WebkitMaskImage: `url(${dest.image})`,
                  maskImage: `url(${dest.image})`,
                }}
              >
                {dest.hoverImage && <img src={dest.hoverImage} alt='' />}
                {dest.hoverVideo && (
                  <video
                    src={dest.hoverVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload='auto'
                  />
                )}
              </div>
            )}

            <img src={dest.image} alt='' className='mainImage' />

            <div className='info'>
              <div className='destTitle'>{dest.title}</div>
              <div className='destDesc'>{dest.desc}</div>
            </div>

            <div className='hoverInfo'>
              <div className='packages'>{dest.packages} Packages</div>
              <div className='viewAll' onClick={() => navigate('/destination')}>
                View All
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeDestinations;
