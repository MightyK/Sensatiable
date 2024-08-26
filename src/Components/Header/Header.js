import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = ({ toggleHome, toggleFavorites, toggleRecommendations }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light Header">
      <h1 onClick={toggleHome}>
        Sensatiable
      </h1>
      <div id="navbarNav">
        <Navbar toggleHome={toggleHome} toggleFavorites={toggleFavorites} toggleRecommendations={toggleRecommendations} />
      </div>
    </nav>
  );
};

export default Header;
