import './corpFirst.scss';
import arrow from '../../../../assets/arrowWhite.svg';
import { useNavigate } from 'react-router-dom';

const CorpFirst = () => {
  const navigate = useNavigate();
  return (
    <section className='CorpFirst'>
      <div className='heading'>
        Thoughtfully planned corporate events that blend productivity with
        exceptional travel experiences.
      </div>
      <div className='subHeading'>
        At NPGO, we design corporate travel experiences that go beyond
        logistics. From strategic offsites and incentive trips to conferences
        and executive retreats, we manage every detail with precision and
        professionalism. Our approach blends seamless planning, premium comfort,
        and meaningful experiences — ensuring your team travels with purpose and
        returns inspired.
      </div>
      <div className='button' onClick={() => navigate('/about')}>
        <span>Plan a Corporate Event</span>
        <img src={arrow} alt='' />
      </div>
    </section>
  );
};

export default CorpFirst;
