import React from 'react';
import './HotSpicy.css';



const HotSpicy = () => {

  // في HotSpicy.jsx
const handleShopLipsClick = () => {
  navigate('/shop?category=makeup&lips=true');
};
  
  return (
    <section className="hot-spicy">
      <div className="hot-spicy-content">
        <div className="hot-spicy-text">
          <h2 className="hot-spicy-tag">HOT & SPICY</h2>
          <h3 className="hot-spicy-title">Most Vibrant<br />Lips in Town</h3>
          <p className="hot-spicy-description">
            Get ready to turn heads with our boldest lip collection yet. 
            Intense pigments, long-lasting formulas, and shades that command attention.
          </p>
       
        </div>
        
        <div className="hot-spicy-image">
          {/* صورة حقيقية ومتناسقة */}
          <img 
src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        alt="Hot & Spicy Lipstick Collection"
            className="hot-spicy-img"
          />
          
          {/* عناصر إضافية على الصورة */}
          <div className="image-overlay">
            <span className="overlay-badge">NEW</span>
            <span className="overlay-badge">LIMITED</span>
          </div>
          
          <div className="floating-label">
            <i className="fas fa-fire"></i>
            <span>Trending Now</span>
          </div>
        </div>
      </div>
      
      {/* تذييل السكشن */}
      <div className="hot-spicy-footer">
        <div className="footer-items">
          <div className="footer-item">
            <i className="fas fa-truck"></i>
            <span>Free Shipping</span>
          </div>
          <div className="footer-item">
            <i className="fas fa-shield-alt"></i>
            <span>Cruelty Free</span>
          </div>
          <div className="footer-item">
            <i className="fas fa-certificate"></i>
            <span>Vegan Formula</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotSpicy;