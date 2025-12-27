// src/pages/CheckoutPage.jsx - الجزء المعدل
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../App';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { currentUser, userData } = useAuth();
  const { cart, getCartTotal, clearCart, showNotification } = React.useContext(CartContext); // ⬅️ أضف showNotification
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: userData?.firstName || '',
    lastName: userData?.lastName || '',
    email: currentUser?.email || '',
    phone: userData?.phone || '',
    address: '',
    city: '',
    country: 'Egypt',
    zipCode: '',
    saveAddress: true
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.phone || 
        !formData.address || !formData.city) {
      setError('Please fill all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const orderData = {
        userId: currentUser.uid,
        userEmail: currentUser.email,
        userName: `${formData.firstName} ${formData.lastName}`,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: parseFloat(item.price.replace('$', '')),
          quantity: item.quantity || 1,
          image: item.image
        })),
        subtotal: getCartTotal(),
        shipping: 0,
        tax: getCartTotal() * 0.08,
        totalAmount: getCartTotal() * 1.08,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          zipCode: formData.zipCode
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        orderId: 'ORD-' + Date.now().toString().slice(-8)
      };
      
      // Save order to Firestore
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Clear cart
      if (clearCart) {
        clearCart();
      }
      
      // Show success notification
      if (showNotification) {
        showNotification('Order placed successfully!', 'success');
      }
      
      // Navigate to order confirmation
      navigate(`/order-confirmation/${docRef.id}`);
      
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal() * 1.08;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="page-title">Checkout</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h3>Shipping Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="disabled-input"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+20 123 456 7890"
                  />
                </div>
                
                <div className="form-group">
                  <label>Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Street address"
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="Egypt">Egypt</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="UAE">United Arab Emirates</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>ZIP/Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Optional"
                  />
                </div>
                
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="saveAddress"
                    name="saveAddress"
                    checked={formData.saveAddress}
                    onChange={handleChange}
                  />
                  <label htmlFor="saveAddress">Save this address for future orders</label>
                </div>
              </div>
              
              <button type="submit" disabled={loading} className="place-order-btn">
                {loading ? 'Processing Order...' : `Place Order - $${total.toFixed(2)}`}
              </button>
            </form>
          </div>
          
          <div className="order-summary-section">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-items-preview">
                {cart.map((item) => (
                  <div key={item.id} className="order-item-preview">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity || 1}</span>
                    </div>
                    <div className="item-price">
                      ${((parseFloat(item.price.replace('$', '')) || 0) * (item.quantity || 1)).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;