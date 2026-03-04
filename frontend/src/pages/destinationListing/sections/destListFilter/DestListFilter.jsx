import { useState } from 'react';
import './destListFilter.scss';

const DestListFilter = () => {
  const [activeType, setActiveType] = useState('domestic');

  const states = ['Maharashtra', 'Goa', 'Rajasthan', 'Kerala'];
  const countries = ['Nepal', 'Thailand', 'France', 'Japan'];
  const packageTypes = ['Spiritual', 'Adventure', 'Luxury', 'Wildlife'];

  return (
    <section className='DestListFilter'>
      <div className='buttons'>
        <div
          className={`button ${activeType === 'domestic' ? 'active' : ''}`}
          onClick={() => setActiveType('domestic')}
        >
          Domestic
        </div>

        <div
          className={`button ${activeType === 'international' ? 'active' : ''}`}
          onClick={() => setActiveType('international')}
        >
          International
        </div>
      </div>

      <div className='bottom'>
        <h4>Filter Destination</h4>

        <div className='filters'>
          {/* Search */}
          <div className='search'>
            <input type='text' placeholder='Search' />
          </div>

          {/* State or Country Dropdown */}
          <div className='location'>
            <select>
              <option value=''>
                {activeType === 'domestic' ? 'Select State' : 'Select Country'}
              </option>

              {(activeType === 'domestic' ? states : countries).map(
                (item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ),
              )}
            </select>
          </div>

          {/* Package Type Dropdown */}
          <div className='packageType'>
            <select>
              <option value=''>Select Package Type</option>
              {packageTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestListFilter;
