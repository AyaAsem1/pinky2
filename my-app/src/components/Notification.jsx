import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'success', duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!isVisible || !message) return null;

  return (
    <div className={`notification ${type} ${isVisible ? 'show' : ''}`}>
      <div className="notification-content">
        <div className="notification-icon">
          {type === 'success' ? (
            <i className="fas fa-check-circle"></i>
          ) : type === 'error' ? (
            <i className="fas fa-exclamation-circle"></i>
          ) : (
            <i className="fas fa-info-circle"></i>
          )}
        </div>
        <div className="notification-text">
          <p>{message}</p>
        </div>
        <button 
          className="notification-close" 
          onClick={() => setIsVisible(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Notification;