import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({music, setMusic}) => {

  return (
    <nav className='navbar navbar-light bg-light | app-navbar'>
      <div className='container-fluid d-flex justify-content-between'>
        <div>
          <a className='navbar-brand' href='/'>
            Family Tree
          </a>
        </div>
        <ul className='navbar-nav d-flex flex-row gap-3'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Carousel
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/wheel'>
              Family Group
            </Link>
          </li>
          <li className='nav-item'>
            <a
              href='https://photos.app.goo.gl/g6opsNrn76cXbVDn9'
              className='btn btn-success w-auto'
              target='_blank'
              rel='noreferrer noopener'
            >
              Frame
            </a>
          </li>
          <li>
            <button className='btn btn-success' onClick={() => setMusic((prev) => !prev) }>{music ? "Pause" : "Play"}</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
