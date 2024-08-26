import React from 'react';
import './Landing.css';

const Landing = ({ onLogin, onSignUp, onGuest }) => {
  return (
    <div className="landing">
      <div className="landing-content">
        {/* <div className="landing-item login" onClick={onLogin}>
          <button className="fancy-button">Login</button>
        </div>
        <div className="landing-item sign-up" onClick={onSignUp}>
          <button className="fancy-button">Sign Up</button>
        </div> */}
        <div className="landing-item guest" onClick={onGuest}>
          <button className="fancy-button">Guest</button>
        </div>
      </div>
    </div>
  );
};

export default Landing;