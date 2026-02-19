import './destMemories.scss';
import mem from '../../../../assets/destination/destmem.gif';

const DestMemories = () => {
  return (
    <section className='HomeMemories'>
      <div className='left'>
        <img src={mem} alt='' />
      </div>
      <div className='right'>
        <h2>Where every destination tells a story.</h2>
        <div className='desc'>
          Travel across India and the world with bespoke journeys crafted around
          culture, comfort, and discovery.
        </div>
      </div>
    </section>
  );
};

export default DestMemories;
