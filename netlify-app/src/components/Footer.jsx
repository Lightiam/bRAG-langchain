import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} XyLo.Dev</p>
        <div className="footer-links">
          <a href="https://xylo.dev/support" target="_blank" rel="noopener noreferrer">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
