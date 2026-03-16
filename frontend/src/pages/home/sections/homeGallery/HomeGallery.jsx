import './homeGallery.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';

const HomeGallery = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return null;

  const gallery = data.images || [];

  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, size + i));
    }
    return result;
  };

  const blocks = chunkArray(gallery, 4);

  return (
    <section className='HomeGallery'>
      <div className='top'>
        <h4>{data.title}</h4>

        <div className='title'>{data.description}</div>
      </div>

      <div className='gallery'>
        {blocks.map((block, i) => (
          <div className='galleryBlock' key={i}>
            {block[0] && (
              <div className='img img-1'>
                <img src={block[0].url} alt={block[0].alt || ''} />
              </div>
            )}

            <div className='right'>
              {block[1] && (
                <div className='img img-2'>
                  <img src={block[1].url} alt={block[1].alt || ''} />
                </div>
              )}

              <div className='bottom'>
                {block[2] && (
                  <div className='img img-3'>
                    <img src={block[2].url} alt={block[2].alt || ''} />
                  </div>
                )}

                {block[3] && (
                  <div className='img img-4'>
                    <img src={block[3].url} alt={block[3].alt || ''} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='bot'>
        <div className='titleDesc'>{data.bottomDescription}</div>

        {data.buttonText && (
          <div className='button' onClick={() => navigate(data.buttonLink)}>
            <span>{data.buttonText}</span>
            <img src={arrow} alt='' />
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeGallery;
