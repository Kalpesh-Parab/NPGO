import './destTravelExp.scss';
import t1 from '../../../../assets/destination/t1.png';
import t2 from '../../../../assets/destination/t2.png';
import t3 from '../../../../assets/destination/t3.png';
import t4 from '../../../../assets/destination/t4.png';
const DestTravelExp = () => {
  const cardsdata = [
    {
      image: t1,
      title: `Corporate Offsites Retreats`,
      desc: `Build stronger teams through carefully planned offsites that combine productivity, relaxation, and exploration.`,
    },
    {
      image: t2,
      title: `Incentive & Reward Trips`,
      desc: `Motivate and reward your top performers with unforgettable travel experiences crafted to leave a lasting impact.`,
    },
    {
      image: t3,
      title: `Conferences & Meetings`,
      desc: `End-to-end planning for domestic and international conferences, meetings, and corporate gatherings.`,
    },
    {
      image: t4,
      title: `Group & Executive Travel`,
      desc: `Effortless travel solutions for leadership teams, departments, and large corporate groups.`,
    },
  ];
  return (
    <section className='DestTravelExp'>
      <div className='top'>Travel Experiences</div>

      <div className='cards'>
        {cardsdata.map((card, index) => (
          <div className='card' key={index}>
            <div className='image'>
              <img src={card.image} alt='card-image' />
            </div>
            <div className='overlay'>
              <div className='title'>{card.title}</div>
              <div className='desc'>{card.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DestTravelExp;
