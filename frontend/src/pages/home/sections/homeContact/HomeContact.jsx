import './homeContact.scss';
import call from '../../../../assets/call.svg';
import msg from '../../../../assets/msg.svg';
const HomeContact = () => {
  return (
    <section className='HomeContact'>
      <div className='left'>
        <h4>Contact</h4>
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
              <div className='mail'>hi@abcdeefg.com</div>
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
      </div>
      <div className='right'></div>
    </section>
  );
};

export default HomeContact;
