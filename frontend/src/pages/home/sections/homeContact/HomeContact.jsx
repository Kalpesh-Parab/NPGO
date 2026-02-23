import './homeContact.scss';
import call from '../../../../assets/call.svg';
import msg from '../../../../assets/msg.svg';
import insta from '../../../../assets/instagram.svg';
import fb from '../../../../assets/facebook.svg';
import yt from '../../../../assets/youtube.svg';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const HomeContact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_tzlbgg7',
        'template_o2bfrdb',
        form.current,
        'RwUFNw4qZD1J5tcrA',
      )
      .then(
        (result) => {
          alert('Message Sent Successfully 🚀');
          form.current.reset();
        },
        (error) => {
          alert('Something went wrong ❌');
        },
      );
  };
  return (
    <section className='HomeContact'>
      <div className='left'>
        <h4>Contact Us</h4>
        <h2>Connect with Us to Design an Exceptional Experience</h2>
        <h4>
          Have questions, need help planning your trip, or want a customized
          travel package? Our team at NPGO is here to assist you every step of
          the way.
        </h4>
        <div className='cta'>
          <div className='chat'>
            <div className='image'>
              <img src={msg} alt='' />
            </div>
            <div className='details'>
              <div className='title'>Chat with us</div>
              <div className='disc'>Our friendly team is here to help.</div>
              <div className='mail'>npgoadventures@gmail.com</div>
            </div>
          </div>
          <div className='chat'>
            <div className='image'>
              <img src={call} alt='' />
            </div>
            <div className='details'>
              <div className='title'>Call us</div>
              <div className='disc'>Call us for your questions</div>
              <div className='mail'>+91 95272 72146</div>
            </div>
          </div>
        </div>
        <div className='blocks'>
          <a
            href='https://www.facebook.com/share/1AiCmXtcjz/?mibextid=wwXIfr'
            target='_blank'
            rel='noopener noreferrer'
            className='block'
          >
            <img src={fb} alt='Facebook' />
          </a>

          <a
            href='https://www.instagram.com/letsnpgo/'
            target='_blank'
            rel='noopener noreferrer'
            className='block'
          >
            <img src={insta} alt='Instagram' />
          </a>

          <a
            href='https://youtube.com/@letsnpgo?si=wAZfEqPUSSevnW6d'
            target='_blank'
            rel='noopener noreferrer'
            className='block'
          >
            <img src={yt} alt='YouTube' />
          </a>
        </div>
      </div>
      <div className='right'>
        <form ref={form} onSubmit={sendEmail}>
          <label>Your Name</label>
          <input
            type='text'
            name='user_name'
            placeholder='Enter your name'
            required
          />

          <label>Your Email</label>
          <input
            type='email'
            name='user_email'
            placeholder='Enter your email address'
            required
          />

          <label>Contact No.</label>
          <input
            type='text'
            name='user_phone'
            placeholder='+91 XXXXX XXXXX'
            required
          />

          <label>Your Message</label>
          <textarea
            name='message'
            placeholder='Tell us about your dream trip...'
            rows='4'
            required
          ></textarea>

          <button type='submit'>Submit Your Enquiry!</button>
        </form>
      </div>
    </section>
  );
};

export default HomeContact;
