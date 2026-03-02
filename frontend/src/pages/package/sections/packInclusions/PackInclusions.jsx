import './packInclusions.scss';
const PackInclusions = ({ data }) => {
  return (
    <section className='PackInclusions'>
      <div className='title'>What's included & What's not included</div>

      <div className='bottom'>
        <div className='included'>
          <h3>What's Included</h3>
          <ul>
            {data.included.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className='nincluded'>
          <h3>What's not Included</h3>
          <ul>
            {data.notIncluded.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PackInclusions;
