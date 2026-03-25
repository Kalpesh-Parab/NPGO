import './footer.scss';
import logopin from '../../assets/logopin.png';
import npgo from '../../assets/npgo.png';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import youtube from '../../assets/youtube.svg';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <section className='Footer'>
      <div className='top'>
        <div className='tLeft'>
          <div className='tLeftLogo'>
            <img src={logopin} alt='' />
            <img src={npgo} alt='' />
          </div>
          <div className='tLeftDesc'>
            Let NPGO open the doors to extraordinary destinations across India
            and beyond, crafting journeys that turn travel into lasting
            memories.
          </div>
        </div>
        <div className='tRight'>
          <div className='tRightList'>
            <div className='listHeading'>Useful Links</div>
            <div className='listing'>
              <NavLink to='/' className='footerLink'>
                Home
              </NavLink>
              <NavLink to='/dest' className='footerLink'>
                Destinations
              </NavLink>
              <NavLink to='/about' className='footerLink'>
                About Us
              </NavLink>
              <NavLink to='/contact' className='footerLink'>
                Contact
              </NavLink>
              <NavLink to='/customise' className='footerLink'>
                Customize Pack
              </NavLink>
              <NavLink to='/events' className='footerLink'>
                NPGO Events
              </NavLink>
              <NavLink to='/merchandise' className='footerLink'>
                Merchandise
              </NavLink>
              <NavLink to='/blogs' className='footerLink'>
                Blogs
              </NavLink>
            </div>
          </div>
          <div className='tRightList'>
            <div className='listHeading'>Social Links</div>
            <div className='listLogos'>
              <a
                href='https://www.facebook.com/share/1AiCmXtcjz/?mibextid=wwXIfr'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={facebook} alt='Facebook' />
              </a>

              <a
                href='https://www.instagram.com/letsnpgo/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={instagram} alt='Instagram' />
              </a>

              <a
                href='https://youtube.com/@letsnpgo?si=wAZfEqPUSSevnW6d'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={youtube} alt='YouTube' />
              </a>
            </div>
          </div>
          <div className='tRightList'>
            <div className='listHeading'>Conatct</div>
            <div className='listing'>
              <div className='li'>Phone: IN: +91 00000000</div>
              <div className='li'>Email: npgo@gmail.com</div>
              <NavLink to='/terms' className='footerLink'>
                Terms & Conditions
              </NavLink>
              <NavLink to='/privacy' className='footerLink'>
                Privacy Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className='hr'></div>
      <div className='bottom'>© 2026 NPGO Inc. All Rights Reserved</div>
    </section>
  );
};

export default Footer;
