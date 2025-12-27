// pages/admin/AdminOrders.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminOrders = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) return <Navigate to="/" />;
  
  return (
    <div className="admin-page">
      <h1>Manage Orders</h1>
      <p>Order management page coming soon...</p>
    </div>
  );
};

export default AdminOrders;

