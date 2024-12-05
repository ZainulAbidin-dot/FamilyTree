import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router-dom for navigation
// Note: If you're not using react-router, replace <Link> with <a> tags

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between">
        <div>
            <a className="navbar-brand" href="/">Family Tree</a>
        </div>
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Carousel</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wheel">Family Group</Link>
            </li>
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;
