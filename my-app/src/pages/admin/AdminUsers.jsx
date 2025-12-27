import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminUsers = () => {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) return <Navigate to="/" />;
  
  return (
    <div className="admin-page">
      <h1>Manage Users</h1>
      <p>User management page coming soon...</p>
    </div>
  );
};

export default AdminUsers;