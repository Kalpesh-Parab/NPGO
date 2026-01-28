import './popularPackages.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';
import p1 from '../../../../assets/p1.png';
import p2 from '../../../../assets/p2.png';
import p3 from '../../../../assets/p3.png';
import p4 from '../../../../assets/p4.png';

const PopularPackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      image: p1,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 4.5,
      price: 4000,
      link: '/destination',
    },
    {
      image: p2,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 5,
      price: 4000,
      link: '/destination',
    },
    {
      image: p3,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 3.7,
      price: 4000,
      link: '/destination',
    },
    {
      image: p4,
      title: 'Himalaya Trek, Nepal',
      desc: 'Mardi Himal Base Camp, Lumle, Nepal',
      ratings: 4,
      price: 4000,
      link: '/destination',
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className='stars'>
        {[...Array(5)].map((_, i) => {
          const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

          return (
            <span className='star' key={i}>
              <span
                className='star-fill'
                style={{ width: `${fillPercentage}%` }}
              >
                ★
              </span>
              <span className='star-base'>★</span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <section className='PopularPackages'>
      <div className='top'>
        <h4>Popular Packages</h4>
        <div className='button' onClick={() => navigate('/destination')}>
          <span>View More Packages</span>
          <img src={arrow} alt='' />
        </div>
      </div>

      <div className='title'>
        NPGO offers end-to-end corporate travel solutions for businesses and
        organizations. We specialize in planning
      </div>

      <div className='titleDesc'>
        From logistics and stays to activities and on-ground coordination, we
        handle every detail to ensure a smooth, professional, and memorable
        corporate journey.
      </div>

      <div className='packageCards'>
        {packages.map((pkg, index) => (
          <div className='card' key={index}>
            <img src={pkg.image} alt='' />

            <div className='info'>
              <div className='cardTitle'>{pkg.title}</div>
              <div className='cardDesc'>{pkg.desc}</div>
            </div>

            <div className='ratings'>
              <span className='ratingText'>{pkg.ratings}/5</span>
              {renderStars(pkg.ratings)}
            </div>

            <div className='details'>
              <div className='viewButton' onClick={() => navigate(pkg.link)}>
                View More Details
              </div>
              <div className='price'>₹{pkg.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPackages;
