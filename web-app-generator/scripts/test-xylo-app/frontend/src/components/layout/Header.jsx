import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>XyLo.Dev</h1>
          <span className="tagline">AI Assistant</span>
        </div>
        <nav className="nav">
          <a href="https://xylo.dev" target="_blank" rel="noopener noreferrer">
            Visit XyLo.Dev
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
