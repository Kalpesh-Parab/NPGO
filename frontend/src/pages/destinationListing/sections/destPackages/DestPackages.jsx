import './destPackages.scss';
import { useNavigate } from 'react-router-dom';

const DestPackages = ({ title, packages = [] }) => {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return (
      <div className='stars'>
        {[...Array(5)].map((_, i) => {
          const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

          return (
            <span className='star' key={i}>
              <span
                className='star-fill'
                style={{ width: `${fillPercentage}%` }}
              >
                ★
              </span>
              <span className='star-base'>★</span>
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <section className='DestPackages'>
      <div className='top'>
        <h4>{title}</h4>
      </div>

      <div className='packageCards'>
        {packages.map((pkg, index) => (
          <div className='card' key={index}>
            <img src={pkg.image} alt={pkg.title} />

            <div className='info'>
              <div className='cardTitle'>{pkg.title}</div>
              {/* <div className='cardDesc'>{pkg.desc}</div> */}
              <div className='cardDesc'>
                {pkg.desc.length > 80
                  ? `${pkg.desc.substring(0, 80)}...`
                  : pkg.desc}
              </div>
            </div>

            <div className='ratings'>
              <span className='ratingText'>{pkg.ratings}/5</span>
              {renderStars(pkg.ratings)}
            </div>

            <div className='details'>
              <div className='viewButton' onClick={() => navigate(pkg.link)}>
                View More Details
              </div>
              <div className='price'>₹{pkg.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestPackages;
