// components/Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: "MAKEUP",
      description: "Stunning beauty collection",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ff5d8f",
      category: "makeup"
    },
    {
      id: 2,
      title: "SHOES",
      description: "Trendy footwear for every occasion",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ff8fab",
      category: "shoes"
    },
    {
      id: 3,
      title: "BAGS",
      description: "Chic handbags & accessories",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80",
      color: "#fb6f92",
      category: "bags"
    },
    {
      id: 4,
      title: "DRESSES",
      description: "Elegant outfits for you",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ffc2d1",
      category: "dresses"
    },
    {
      id: 5,
      title: "ACCESSORIES",
      description: "Complete your look",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      color: "#ffb3c6",
      category: "accessories"
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Pinky's World</h1>
          <p className="hero-subtitle">
            Discover the ultimate collection for the modern woman.<br />
            Everything you need in one place.
          </p>
          
          <div className="hero-categories">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="category-card"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(${category.image})`,
                  borderColor: category.color
                }}
                onClick={() => handleCategoryClick(category.category)}
              >
                <div className="category-overlay"></div>
                <div className="category-content">
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <span className="category-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="hero-cta">
            <button 
              className="shop-btn"
              onClick={() => navigate('/shop')}
            >
              <i className="fas fa-shopping-bag"></i>
              SHOP THE COLLECTION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;