import './homeGallery.scss';
import arrow from '../../../../assets/arrow.svg';
import g1 from '../../../../assets/g1.png';
import g2 from '../../../../assets/g2.png';
import g3 from '../../../../assets/g3.png';
import g4 from '../../../../assets/g4.png';
import g5 from '../../../../assets/g5.png';
import g6 from '../../../../assets/g6.png';
import g7 from '../../../../assets/g7.png';
import { useNavigate } from 'react-router-dom';

const HomeGallery = () => {
  const gallery = [g1, g2, g3, g4, g5, g6, g7];
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, size + i));
    }
    return result;
  };
  const blocks = chunkArray(gallery, 4);

  const navigate = useNavigate();

  return (
    <section className='HomeGallery'>
      <div className='top'>
        <h4>Destination Packages</h4>
        <div className='title'>
          Our gallery showcases the beauty, culture, landscapes, and experiences
          our travelers have discovered across the world with NPGO.
        </div>
      </div>

      <div className='gallery'>
        {blocks.map((block, i) => (
          <div className='galleryBlock' key={i}>
            {block[0] && (
              <div className='img img-1'>
                <img src={block[0]} alt='' />
              </div>
            )}

            <div className='right'>
              {block[1] && (
                <div className='img img-2'>
                  <img src={block[1]} alt='' />
                </div>
              )}

              <div className='bottom'>
                {block[2] && (
                  <div className='img img-3'>
                    <img src={block[2]} alt='' />
                  </div>
                )}
                {block[3] && (
                  <div className='img img-4'>
                    <img src={block[3]} alt='' />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bot'>
        <div className='titleDesc'>
          From serene beaches and majestic mountains to vibrant cities and
          cultural wonders, these moments reflect the essence of travel —
          authentic, inspiring, and unforgettable. Let these visuals spark your
          wanderlust and inspire your next adventure.
        </div>

        <div className='button' onClick={() => navigate('/destination')}>
          <span>Explore Destinations</span>
          <img src={arrow} alt='' />
        </div>
      </div>
    </section>
  );
};

export default HomeGallery;
