import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className='logo-container'>
      <h3>BinaryLingo</h3>
      <button>Sign-Out</button>
      </div>
    <nav className="navbar">
    <h1>Science Fiction Stories</h1>
      <ul className="nav-links">
        <li>
          <NavLink to="/" className="new-link">New</NavLink>
        </li>
        <li>
          <NavLink to="/" className="inprogress-link">In Progress</NavLink>
        </li>
        <li>
          <NavLink to="/" className="completed-link">Completed</NavLink>
        </li>
        <li>
          <NavLink to="/" className="clearall-link">Clear All</NavLink>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
