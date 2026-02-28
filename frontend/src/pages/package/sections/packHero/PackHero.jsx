import './packHero.scss';
import comm from '../../../../assets/common/comm.mp4';
import arrow from '../../../../assets/arrow.svg';
import { useNavigate } from 'react-router-dom';

const PackHero = () => {
  const navigate = useNavigate();
  return (
    <section className='PackHero'>
      <div className='background'>
        <video src={comm} autoPlay loop muted playsInline></video>
      </div>
      <div className='overlay'></div>
      <div className='details'>
        <h4>Package Details</h4>
        <h2>USA New York Washington Philadelphia with Lurray & Shenandoah</h2>
        <div className='tags'>
          <div className='tag'>6 Days</div>
          <div className='tag'>1 Country | 6 Cities</div>
        </div>
        <div className='price'>
          <div className='start'>Starting From</div>
          <div className='cost'>
            <span>$900.00</span> per person
          </div>
        </div>
        <div className='button' onClick={() => navigate('/destination')}>
          <span>Enquire Now</span>
          <img src={arrow} alt='' />
        </div>
      </div>
    </section>
  );
};

export default PackHero;
