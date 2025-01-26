// components/Navbar.js
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css'; // Path to your custom CSS file
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-custom'>
      <div className='container'>
        <a className='navbar-brand' href='#'>
          DineDiscover
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link' href='/'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/about'>
                About us
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/contact'>
                Contact us
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='/login'>
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
