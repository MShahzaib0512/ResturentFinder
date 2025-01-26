'use client';

import '../styles/footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className='footer-container'>
      <div className='footer-content container'>
        {/* About Section */}
        <div className='footer-section about'>
          <h3>About Us</h3>
          <p>
            We are passionate about connecting people with amazing dining spots.
            Join our journey to explore the best culinary experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div className='footer-section links'>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href='/about-us'>About Us</a>
            </li>
            <li>
              <a href='/contact-us'>Contact Us</a>
            </li>
            <li>
              <a href='/services'>Services</a>
            </li>
            <li>
              <a href='/privacy-policy'>Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className='footer-section social'>
          <h3>Follow Us</h3>
          <div className='social-icons'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaFacebook />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaTwitter />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaInstagram />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className='footer-section contact'>
          <h3>Contact Info</h3>
          <p>Email: info@culinaryhub.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; 2025 Culinary Hub. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
