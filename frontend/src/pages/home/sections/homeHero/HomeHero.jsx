import './homeHero.scss';
import bg from '../../../../assets/homeHero.mp4';
import arrow from '../../../../assets/arrow.svg';

const HomeHero = () => {
  return (
    <section className='HomeHero'>
      <video
        autoPlay
        muted
        loop
        playsInline
        className='bg-video'
        preload='none' // lazy load hint
      >
        <source src={bg} type='video/mp4' />
      </video>
      <div className='overlay'>
        <div className='heading'>
          Transforming Dreams into Realities <br />
          One Happy Traveler at a Time!
        </div>
        <div className='subHeading'>
          Our passion for exploration fuels us to craft personalized experiences
          that dive deep into the heart of each destination. Let’s make your
          travel dreams a reality!
        </div>

        <div className='button'>
          <span>Explore Destinations</span>
          <img src={arrow} alt='' />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
