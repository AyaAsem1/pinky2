import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminProducts = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) return <Navigate to="/" />;
  
  return (
    <div className="admin-page">
      <h1>Manage Products</h1>
      <p>Product management page coming soon...</p>
    </div>
  );
};

export default AdminProducts;