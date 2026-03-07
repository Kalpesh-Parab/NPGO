import './eventsExplorer.scss';
import { useNavigate } from 'react-router-dom';
const EventsExplorer = ({ title, events = [] }) => {
  
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
    <section className='EventsExplorer'>
      <div className='top'>
        <h4>{title}</h4>
      </div>

      <div className='packageCards'>
        {events.map((evnt, index) => (
          <div className='card' key={index}>
            <img src={evnt.image} alt={evnt.title} />

            <div className='info'>
              <div className='cardTitle'>{evnt.title}</div>
              <div className='cardDesc'>{evnt.desc}</div>
            </div>

            <div className='ratings'>
              <span className='ratingText'>{evnt.ratings}/5</span>
              {renderStars(evnt.ratings)}
            </div>

            <div className='details'>
              <div className='viewButton' onClick={() => navigate(evnt.link)}>
                View More Details
              </div>
              <div className='price'>₹{evnt.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsExplorer;
