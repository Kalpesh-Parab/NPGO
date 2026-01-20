import './homeHero.scss';
import bg from '../../../../assets/homeHero.mp4';
import arrow from '../../../../assets/arrow.svg';

const HomeHero = () => {
  return (
    <div className='HomeHero'>
      <video src={bg}></video>
      <div className='title'>
        Transforming Dreams into Realities One Happy Traveler at a Time!
      </div>
      <div className='subTitle'>
        Our passion for exploration fuels us to craft personalized experiences
        that dive deep into the heart of each destination. Let’s make your
        travel dreams a reality!
      </div>

          <div className='button'>Explore Destinations
              <img src={arrow} alt="" />
      </div>
    </div>
  );
};

export default HomeHero;
