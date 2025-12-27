// src/components/Footer.jsx
import React from 'react';
import '../components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-logo">PINKY</h3>
          <p className="footer-tagline">Premium cosmetics for the bold and beautiful</p>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-pinterest-p"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-links">
            <li><a href="#">All Products</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Face</a></li>
            <li><a href="#">Lips</a></li>
            <li><a href="#">Eyes</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Help</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping & Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Newsletter</h4>
          <p className="newsletter-text">Subscribe for exclusive offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email" className="newsletter-input" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pinky Cosmetics. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;