import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { useNavigate, Navigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Auth.css';

const Profile = () => {
  const { currentUser, userData } = useAuth();
  const [ordersCount, setOrdersCount] = useState(0);
  const [loadingOrders, setLoadingOrders] = useState(true);
const navigate = useNavigate();


useEffect(() => {
    const fetchOrdersCount = async () => {
      if (!currentUser) return;
      
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        setOrdersCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching orders count:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrdersCount();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/account/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

   if (!currentUser) {
    return <Navigate to="/account/login" />;
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar">
          {userData?.fullName?.charAt(0).toUpperCase() || 'U'}
        </div>
        <h2>Welcome, {userData?.fullName || 'User'}</h2>
        <p className="user-email">{currentUser.email}</p>
        <p className="user-role">Account Type: {userData?.role === 'admin' ? 'Administrator' : 'Regular User'}</p>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <h3>Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Full Name:</span>
              <span className="value">{userData?.fullName || 'Not set'}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{currentUser.email}</span>
            </div>
            <div className="info-item">
              <span className="label">Member Since:</span>
              <span className="value">{formatDate(userData?.createdAt)}</span>
            </div>
            <div className="info-item">
              <span className="label">Total Orders:</span>
              <span className="value">
                {loadingOrders ? (
                  <span className="loading-text">Loading...</span>
                ) : (
                  ordersCount
                )}
              </span>
            </div>
          </div>
        </div>
        
        {/* إخفاء قسم الطلبات وإظهار زر فقط */}
        <div className="profile-section orders-section-minimal">
          <div className="orders-summary">
            <h3>Your Orders</h3>
            <p>View and manage all your past orders</p>
            <button 
              className="view-all-orders-btn"
              onClick={() => navigate('/account/orders')}
            >
              <i className="fas fa-shopping-bag"></i>
              View All Orders ({ordersCount})
            </button>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="btn-secondary" onClick={() => navigate('/account/edit')}>
            <i className="fas fa-edit"></i>
            Edit Profile
          </button>
          <button className="btn-secondary" onClick={() => navigate('/account/address')}>
            <i className="fas fa-map-marker-alt"></i>
            Manage Addresses
          </button>
          <button className="btn-secondary" onClick={() => navigate('/favorites')}>
            <i className="fas fa-heart"></i>
            My Favorites
          </button>
        </div>
        
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Profile;