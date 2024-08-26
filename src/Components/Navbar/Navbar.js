import React from 'react';

const Navbar = ({ toggleHome, toggleFavorites, toggleRecommendations }) => {
  return (

    <ul className="navbar-nav">
        <li className="nav-item">
        {/* eslint-disable-next-line */}
          <a className="nav-link" onClick={toggleHome}>
            Home
          </a>
        </li>
 
        <li className="nav-item">
        {/* eslint-disable-next-line */}
          <a className="nav-link" onClick={toggleFavorites}>
            Favorites
          </a>
        </li>

        <li className="nav-item">
        {/* eslint-disable-next-line */}
          <a className="nav-link" onClick={toggleRecommendations}>
            Recommendations
          </a>
        </li>
      </ul>

  );
};

export default Navbar;