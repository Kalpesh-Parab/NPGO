import { useEffect, useState, useRef } from 'react';
import './homeExperience.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';
import img1 from '../../../../assets/exp.png';
import img2 from '../../../../assets/p1.png';
import img3 from '../../../../assets/p2.png';

const images = [
  { id: 'a', src: img1 },
  { id: 'b', src: img2 },
  { id: 'c', src: img3 },
];

const HomeExperience = () => {
  const navigate = useNavigate();
  const [stack, setStack] = useState(images);
  const [flipping, setFlipping] = useState(false);
  const timerRef = useRef(null);

  const nextCard = () => {
    if (flipping) return;

    setFlipping(true);

    timerRef.current = setTimeout(() => {
      setStack((prev) => {
        const [top, ...rest] = prev;
        return [...rest, top];
      });
      setFlipping(false);
    }, 100); // MUST match CSS animation
  };

  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className='HomeExperience'>
      <div className='left'>
        <div
          className={`photo-stack ${flipping ? 'flipping' : ''}`}
          onClick={nextCard}
        >
          {stack.map((item, i) => (
            <div key={item.id} className={`photo-card position-${i}`}>
              <img src={item.src} alt='' />
            </div>
          ))}
        </div>
      </div>

      <div className='right'>
        <h4>Customized Packages</h4>

        <div className='title'>
          We are <span>experience</span> Designers.
        </div>

        <div className='desc'>
          Our team of highly experienced travel designers will guide you from
          beginning to end as you embark on a tailor-made journey of
          distinction, enjoying truly exclusive and authentic cultural
          experiences.
        </div>
        <div className='button' onClick={() => navigate('/destination')}>
          <span>Craft Your Journey !</span>
          <img src={arrow} alt='' />
        </div>
      </div>
    </section>
  );
};

export default HomeExperience;
