// pages/AboutPage.jsx
import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">About Pinky</h1>
        <p className="about-subtitle">Redefining beauty with passion and precision</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, Pinky began with a simple mission: to create high-quality, 
              cruelty-free cosmetics that empower individuals to express their unique beauty. 
              Our founders, makeup artists with over 15 years of experience, noticed a gap 
              in the market for products that were both luxurious and accessible.
            </p>
            <p>
              Today, we're proud to be one of the fastest-growing beauty brands, known for 
              our innovative formulas, inclusive shade ranges, and commitment to sustainability.
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder story">OUR STORY</div>
          </div>
        </div>

        <div className="about-section reverse">
          <div className="about-text">
            <h2>Our Philosophy</h2>
            <p>
              At Pinky, we believe that beauty is about self-expression, not conformity. 
              Our products are designed to enhance your natural features while allowing 
              you to experiment and have fun with makeup.
            </p>
            <ul className="philosophy-list">
              <li><i className="fas fa-check"></i> Cruelty-free and vegan formulas</li>
              <li><i className="fas fa-check"></i> Inclusive shade ranges for all skin tones</li>
              <li><i className="fas fa-check"></i> Sustainable packaging and practices</li>
              <li><i className="fas fa-check"></i> High-performance, long-wearing products</li>
              <li><i className="fas fa-check"></i> Affordable luxury for everyone</li>
            </ul>
          </div>
          <div className="about-image">
            <div className="image-placeholder philosophy">OUR PHILOSOPHY</div>
          </div>
        </div>

        <div className="values-section">
          <h2 className="values-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Quality</h3>
              <p>We never compromise on the quality of our ingredients or formulations.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Sustainability</h3>
              <p>We're committed to reducing our environmental footprint through eco-friendly practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Inclusivity</h3>
              <p>Beauty is for everyone, and our products reflect that belief.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovation</h3>
              <p>We're constantly researching and developing new, better formulas.</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2 className="team-title">Meet Our Founders</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <div className="image-placeholder member">SARAH</div>
              </div>
              <h3>Sarah Chen</h3>
              <p className="member-role">CEO & Founder</p>
              <p className="member-bio">Former lead makeup artist with 15+ years in the beauty industry.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="image-placeholder member">MICHAEL</div>
              </div>
              <h3>Michael Rodriguez</h3>
              <p className="member-role">Creative Director</p>
              <p className="member-bio">Award-winning makeup artist and product development expert.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <div className="image-placeholder member">JESSICA</div>
              </div>
              <h3>Jessica Park</h3>
              <p className="member-role">Head of Formulation</p>
              <p className="member-bio">Chemistry PhD specializing in cosmetic science and sustainable ingredients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;