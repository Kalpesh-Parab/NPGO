import './homeBike.scss';
import arrowW from '../../../../assets/arrowWhite.svg';
import arrow from '../../../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';
import Bike1 from '../../../../assets/b1.png';
import Bike2 from '../../../../assets/b2.png';
import Bike3 from '../../../../assets/b3.png';

const HomeBike = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: `Konkan Bike Travel`,
      desc: `From logistics and stays to activities and on-ground coordination`,
      image: Bike1,
    },
    {
      title: `Konkan Bike Travel`,
      desc: `From logistics and stays to activities and on-ground coordination`,
      image: Bike2,
    },
    {
      title: `Konkan Bike Travel`,
      desc: `From logistics and stays to activities and on-ground coordination`,
      image: Bike3,
    },
  ];

  return (
    <section className='HomeBike'>
      <div className='left'>
        <h4>Experience</h4>
        <div className='title'>
          Your travel should be as unique as you are. With NPGO’s custom tour
          service
        </div>
        <div className='titleDesc'>
          Choose destinations, duration, accommodation style, experiences, and
          budget and we’ll craft a personalized itinerary that matches your
          vision. Perfect for honeymoon trips, family vacations, solo journeys,
          or private group tours.
        </div>
        <div className='button' onClick={() => navigate('/destination')}>
          <span>Know More</span>
          <img src={arrow} alt='' />
        </div>
      </div>

      <div className='right'>
        {cards.map((card, index) => (
          <div className='card' key={index}>
            <img src={card.image} alt='' className='cImg' />
            <div className='bot'>
              <div className='cleft'>
                <div className='cardTitle'>{card.title}</div>
                <div className='cardDesc'>{card.desc}</div>
              </div>
              <div className='cright'>
                <div
                  className='button'
                  onClick={() => navigate('/destination')}
                >
                  <span>View More Packages</span>
                  <img src={arrowW} alt='' />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='card2'>
          <h2>Hold On! there’s more to Experience!</h2>
          <div className='button' onClick={() => navigate('/destination')}>
            <span>Know More</span>
            <img src={arrowW} alt='' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBike;
