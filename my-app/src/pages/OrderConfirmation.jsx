// src/pages/OrderConfirmation.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="loading">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="not-found">
        <h2>Order not found</h2>
        <Link to="/" className="back-home">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-header">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Order Confirmed!</h1>
          <p className="confirmation-subtitle">
            Thank you for your purchase, {order.userName}!
          </p>
          <p className="order-number">Order #{order.orderId}</p>
        </div>
        
        <div className="confirmation-details">
          <div className="detail-card">
            <h3>Order Summary</h3>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>${order.shipping.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="detail-card">
            <h3>Shipping Information</h3>
            <div className="shipping-info">
              <p><strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</strong></p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.country}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
              {order.shippingAddress.zipCode && (
                <p>ZIP Code: {order.shippingAddress.zipCode}</p>
              )}
            </div>
          </div>
          
          <div className="detail-card">
            <h3>Order Status</h3>
            <div className={`status-badge status-${order.status}`}>
              {order.status.toUpperCase()}
            </div>
            <p className="status-message">
              Your order is being processed. You will receive an email confirmation shortly.
            </p>
          </div>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/account/orders" className="btn-primary">
            <i className="fas fa-shopping-bag"></i>
            View My Orders
          </Link>
          <Link to="/shop" className="btn-secondary">
            <i className="fas fa-shopping-cart"></i>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;