import './homeMemories.scss';
import mem from '../../../../assets/mem.gif';

const HomeMemories = () => {
  return (
    <section className='HomeMemories'>
      <div className='left'>
        <img src={mem} alt='' />
      </div>
      <div className='right'>
        <h2>Travel made simple. Memories made unforgettable.</h2>
        <div className='desc'>
          Explore handpicked destinations across the globe, chosen for their
          beauty, culture, and unique travel experiences.
        </div>
      </div>
    </section>
  );
};

export default HomeMemories;
