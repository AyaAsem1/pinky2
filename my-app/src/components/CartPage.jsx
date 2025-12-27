// src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import { useAuth } from '../context/AuthContext';
import './CartPage.css';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, showNotification } = useContext(CartContext);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!currentUser) {
      showNotification('Please sign in to proceed with checkout', 'error');
      navigate('/account/login', { state: { from: '/checkout' } });
      return;
    }
    
    if (cart.length === 0) {
      showNotification('Your cart is empty', 'error');
      return;
    }
    
    navigate('/checkout');
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="cart-page empty">
        <div className="empty-cart">
          <i className="fas fa-shopping-bag"></i>
          <h2>Your cart is empty</h2>
          <p>Add products to cart by clicking the shopping bag icon</p>
          <Link to="/" className="back-to-shop">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Shopping Cart</h1>
        <p className="page-subtitle">{cart.length} items</p>
      </div>
      
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="cart-item-img"
                />
              </div>
              
              <div className="cart-item-info">
                <h3 className="product-name">{item.name}</h3>
                <div className="product-meta">
                  <span className="product-price">{item.price}</span>
                </div>
                
                <div className="cart-item-actions">
                  <div className="quantity-selector">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity || 1}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <i className="fas fa-trash"></i>
                    Remove
                  </button>
                </div>
              </div>
              
              <div className="cart-item-total">
                <span className="total-price">
                  ${((parseFloat(item.price.replace('$', '')) || 0) * (item.quantity || 1)).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
            </div>
          </div>
          
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          
          <Link to="/" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;