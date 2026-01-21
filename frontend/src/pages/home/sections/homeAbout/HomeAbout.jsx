import './homeAbout.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';
import about from '../../../../assets/homeAbout.png';

const HomeAbout = () => {
  const navigate = useNavigate();
  return (
    <div className='HomeAbout'>
      <div className='left'>
        <h5>About Us</h5>
        <h2>
          Explore unforgettable destinations, curated travel experiences, and
          custom journeys designed around you.
        </h2>
        <h3>
          NPGO is a modern travel company built to make exploring the world
          simple, seamless, and unforgettable. We believe travel should be more
          than just visiting places — it should be about experiencing cultures,
          discovering hidden gems, and creating memories that last a lifetime.
        </h3>
        <div className='button' onClick={() => navigate('/about')}>
          <span>More About Us</span>
          <img src={arrow} alt='' />
        </div>
      </div>
      <div className='right'>
        <img src={about} alt='' />
      </div>
    </div>
  );
};

export default HomeAbout;
