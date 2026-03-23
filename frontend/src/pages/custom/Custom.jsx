import './custom.scss';
import CommonHero from '../../components/commonHero/CommonHero';
import comm from '../../assets/common/comm.mp4';
import arrow from '../../assets/arrowWhite.svg';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import API from '../../admin/services/api';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Custom = () => {
  const location = useLocation();

  const previousPage = location.state?.from || null;
  const [formData, setFormData] = useState({
    knowDestination: '',
    day: '',
    month: '',
    year: '',
    nights: '',
    adults: 1,
    children: 0,
    mustDo: '',
    specialOccasion: '',
    flights: '',
    budget: 1000,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const MIN = 1000;
  const MAX = 100000;

  const percentage = ((formData.budget - MIN) / (MAX - MIN)) * 100;

  const startDrag = (e) => {
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();

    const move = (clientX) => {
      let newX = clientX - rect.left;
      newX = Math.max(0, Math.min(newX, rect.width));

      const percent = newX / rect.width;
      const value = Math.round((MIN + percent * (MAX - MIN)) / 500) * 500;

      setFormData({ ...formData, budget: value });
    };

    const onMouseMove = (e) => move(e.clientX);

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    move(e.clientX);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      toast.error('Please accept Terms and Conditions');
      return;
    }

    const toastId = toast.loading('Submitting enquiry...');

    try {
      // 🔥 1. Save to backend
      await API.post('/custom-enquiry', {
        ...formData,

        source: {
          from: previousPage,
          type: previousPage?.split('/')[1] || 'custom',
          slug: previousPage?.split('/')[2] || null,
        },
      });

      // 🔥 2. EmailJS
      await emailjs.send(
        'service_tzlbgg7',
        'template_24xzq25',
        formData,
        'RwUFNw4qZD1J5tcrA',
      );

      toast.success('Enquiry submitted 🚀', { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong ❌', { id: toastId });
    }
  };

  return (
    <section className='Custom'>
      <CommonHero
        title='We craft your experience.'
        backgroundType='video'
        backgroundSrc={comm}
      />

      <div className='bottom'>
        <div className='title'>Your journey starts here</div>
        <div className='desc'>
          Diverge from the typical tourist destinations...
        </div>

        <form className='customForm' onSubmit={handleSubmit}>
          {/* Destination */}
          <label>Do you know where you want to go?</label>
          <div className='toggleRow'>
            <button
              type='button'
              className={formData.knowDestination === 'yes' ? 'active' : ''}
              onClick={() =>
                setFormData({ ...formData, knowDestination: 'yes' })
              }
            >
              Yes I know!
            </button>

            <button
              type='button'
              className={formData.knowDestination === 'no' ? 'active' : ''}
              onClick={() =>
                setFormData({ ...formData, knowDestination: 'no' })
              }
            >
              No I don't know
            </button>
          </div>

          {/* Date */}
          <label>When would you like to go?</label>
          <div className='grid4'>
            <select name='day' onChange={handleChange}>
              <option>Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>

            <select name='month' onChange={handleChange}>
              <option>Month</option>
              {[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <select name='year' onChange={handleChange}>
              <option>Year</option>
              {[2026, 2027, 2028, 2029].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>

            <select name='nights' onChange={handleChange}>
              <option>Nights</option>
              {[...Array(15)].map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </div>

          {/* People */}
          <label>Who's going?</label>
          <div className='grid2'>
            <select name='adults' onChange={handleChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => (
                <option key={a} value={a}>
                  {a} Adults (18+)
                </option>
              ))}
            </select>

            <select name='children' onChange={handleChange}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => (
                <option key={c} value={c}>
                  {c} Children
                </option>
              ))}
            </select>
          </div>

          {/* Must Do */}
          <label>Must Sees & Must Dos</label>
          <textarea
            name='mustDo'
            placeholder='i.e. climb a volcano, Safari with elephants, meet the Queen'
            onChange={handleChange}
          />

          {/* Special Occasion */}
          <label>Is this trip for a special occasion?</label>
          <div className='toggleRow'>
            <button
              type='button'
              className={formData.specialOccasion === 'yes' ? 'active' : ''}
              onClick={() =>
                setFormData({ ...formData, specialOccasion: 'yes' })
              }
            >
              Yes
            </button>

            <button
              type='button'
              className={formData.specialOccasion === 'no' ? 'active' : ''}
              onClick={() =>
                setFormData({ ...formData, specialOccasion: 'no' })
              }
            >
              No
            </button>
          </div>

          {/* Flights */}
          <label>Do you require flights?</label>
          <div className='toggleRow'>
            <button
              type='button'
              className={formData.flights === 'yes' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, flights: 'yes' })}
            >
              Yes
            </button>

            <button
              type='button'
              className={formData.flights === 'no' ? 'active' : ''}
              onClick={() => setFormData({ ...formData, flights: 'no' })}
            >
              No
            </button>
          </div>

          {/* Budget Slider */}
          <label>Budget per person</label>

          <div className='budgetSlider'>
            <span className='min'>₹1,000</span>

            <div className='sliderTrack' onMouseDown={(e) => startDrag(e)}>
              <div
                className='sliderProgress'
                style={{ width: `${percentage}%` }}
              ></div>

              <div className='sliderThumb' style={{ left: `${percentage}%` }}>
                <div className='sliderBubble'>
                  ₹{formData.budget.toLocaleString()}
                </div>
              </div>
            </div>

            <span className='max'>₹100,000</span>
          </div>

          {/* Details */}
          <label>Your Details</label>
          <div className='grid2'>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              onChange={handleChange}
              required
            />
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              onChange={handleChange}
              required
            />
          </div>

          <input
            type='email'
            name='email'
            placeholder='Email Address'
            onChange={handleChange}
            required
          />

          <input
            type='text'
            name='phone'
            placeholder='Phone Number'
            onChange={handleChange}
            required
          />

          <div className='terms'>
            <input type='checkbox' name='terms' onChange={handleChange} />
            <span>
              I confirm that I have read and accepted the{' '}
              <u>Terms and Conditions</u>
            </span>
          </div>

          <button type='submit' className='submitBtn'>
            <span>Submit Your Enquiry</span>
            <img src={arrow} alt='' />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Custom;
