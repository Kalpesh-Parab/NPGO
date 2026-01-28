import './homeExperience.scss';
import exp from '../../../../assets/exp.png';

const HomeExperience = () => {
  return (
    <section className='HomeExperience'>
      <div className='left'>
        <div className='photo'>
          <img src={exp} alt='' />
        </div>
      </div>
      <div className='right'>
        <h4>Customized Packages</h4>
        <div className='title'>
          We are <span>experience</span> Designers.
        </div>
        <div className='desc'>
          Our team of highly experienced travel designers will guide you from
          beginning to end as you embark on a tailor-made journey of
          distinction, enjoying truly exclusive and authentic cultural
          experiences. We can fulfil your bucket-list dreams.
        </div>
      </div>
    </section>
  );
};

export default HomeExperience;
