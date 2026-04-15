import './destIntExplore.scss';
import arrow from '../../../../assets/arrow.svg';
import int from '../../../../assets/destination/int.png';
import { useNavigate } from 'react-router-dom';
import { scrollToContact } from '../../../../utils/scrollToContact';

const DestIntExplore = () => {
  const navigate = useNavigate();
  return (
    <section className='DestIntExplore'>
      <div className='left'>
        <div className='texts'>
          <h4>International Destinations</h4>
          <h2>We’re expanding beyond borders!</h2>
          <h3>International trips are coming soon.</h3>
        </div>
        <div className='button' onClick={scrollToContact}>
          <span>Contact Us</span>
          <img src={arrow} alt='' />
        </div>
      </div>
      <div className='right'>
        <div className='card'>
          <img src={int} alt='' />
        </div>
        <div className='card'>
          <img src={int} alt='' />
        </div>
      </div>
      <div className='buttonMob' onClick={scrollToContact}>
        <span>Contact Us</span>
        <img src={arrow} alt='' />
      </div>
    </section>
  );
};

export default DestIntExplore;
