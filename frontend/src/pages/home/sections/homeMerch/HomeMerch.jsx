import './homeMerch.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import merch1 from '../../../../assets/merch1.png';
import merch2 from '../../../../assets/merch2.png';
import merch3 from '../../../../assets/merch3.png';
import { useNavigate } from 'react-router-dom';

const HomeMerch = () => {
  const merchs = [
    {
      photo: merch1,
      title: 'NPGO Caps',
      price: '150',
      desc: 'lorem ipsum dolor sit amet',
    },
    {
      photo: merch2,
      title: 'NPGO Caps',
      price: '150',
      desc: 'lorem ipsum dolor sit amet',
    },
    {
      photo: merch3,
      title: 'NPGO Caps',
      price: '150',
      desc: 'lorem ipsum dolor sit amet',
    },
    {
      photo: merch1,
      title: 'NPGO Caps',
      price: '150',
      desc: 'lorem ipsum dolor sit amet',
    },
  ];
  const navigate = useNavigate();

  return (
    <section className='HomeMerch'>
      <div className='top'>
        <h4>Merchandise</h4>
        <div className='button' onClick={() => navigate('/merchandise')}>
          <span>View All Merchandise</span>
          <img src={arrow} alt='' />
        </div>
      </div>
      <h3>
        NPGO offers end-to-end corporate travel solutions for businesses and
        organizations. We specialize in planning
      </h3>

      <div className='desc'>
        From logistics and stays to activities and on-ground coordination, we
        handle every detail to ensure a smooth, professional, and memorable
        corporate journey.
      </div>
      <div className='products'>
        {merchs.map((merch, index) => {
          return (
            <div className='product' key={index}>
              <div className='image'>
                <img src={merch.photo} alt='' />
              </div>
              <div className='pDetails'>
                <div className='pLeft'>
                  <div className='title'>{merch.title}</div>
                  <div className='desc'>{merch.desc}</div>
                </div>
                <div className='price'>₹{merch.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeMerch;
