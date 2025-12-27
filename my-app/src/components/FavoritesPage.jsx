// pages/FavoritesPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './FavoritesPage.css';
import { CartContext } from '../App';

const FavoritesPage = () => {
  // استخدم الـ Context هنا
  const { favorites, toggleFavorite, addToCart } = useContext(CartContext);
    console.log('FavoritesPage - favorites:', favorites); // للتشخيص
  
  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-page empty">
        <div className="empty-favorites">
          <i className="fas fa-heart"></i>
          <h2>Your favorites list is empty</h2>
          <p>Add products to favorites by clicking the heart icon</p>
          <Link to="/" className="back-to-shop">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="page-header">
        <h1>My Favorites</h1>
        <p className="page-subtitle">{favorites.length} items</p>
      </div>
      
      <div className="favorites-grid">
        {favorites.map((product) => (
          <div key={product.id} className="favorite-item">
            <div className="favorite-image">
              <img 
                src={product.image} 
                alt={product.name}
                className="favorite-img"
              />
              <button 
                className="remove-favorite-btn"
                onClick={() => toggleFavorite(product)}
                title="Remove from favorites"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="favorite-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-meta">
                <span className="product-price">{product.price}</span>
              </div>
              
              <div className="favorite-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;