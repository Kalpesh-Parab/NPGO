import './homeAbout.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';

const HomeAbout = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return null;

  const handleClick = () => {
    if (data.buttonLink) {
      navigate(data.buttonLink);
    }
  };

  return (
    <div className='HomeAbout'>
      <div className='left'>
        {data.sectionTitle && <h5>{data.sectionTitle}</h5>}

        {data.heading && <h2>{data.heading}</h2>}

        {data.description && <h3>{data.description}</h3>}

        {data.buttonText && (
          <div className='button' onClick={handleClick}>
            <span>{data.buttonText}</span>
            <img src={arrow} alt='arrow' />
          </div>
        )}
      </div>

      <div className='right'>
        {data.image?.url && (
          <img src={data.image.url} alt={data.image.alt || 'About image'} />
        )}
      </div>
    </div>
  );
};

export default HomeAbout;
