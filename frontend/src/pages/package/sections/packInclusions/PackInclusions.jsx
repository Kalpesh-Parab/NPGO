import './packInclusions.scss';

const PackInclusions = ({ data }) => {
  if (!data) return null;

  const { included = [], notIncluded = [] } = data;

  return (
    <section className='PackInclusions'>
      <div className='title'>
        What's included & What's not included
      </div>

      <div className='bottom'>
        {/* INCLUDED */}
        <div className='included'>
          <h3>What's Included</h3>

          {included.length > 0 ? (
            <ul>
              {included.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No inclusions available</p>
          )}
        </div>

        {/* NOT INCLUDED */}
        <div className='nincluded'>
          <h3>What's not Included</h3>

          {notIncluded.length > 0 ? (
            <ul>
              {notIncluded.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No exclusions available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PackInclusions;