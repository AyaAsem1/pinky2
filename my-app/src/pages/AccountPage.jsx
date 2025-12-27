import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
import Profile from '../components/auth/Profile';
import EditProfile from './account/EditProfile';
import Address from './account/Address'; // أضف هذا الاستيراد
import AllOrders from './account/AllOrders';
import Signup from '../components/auth/Signup';

const AccountPage = () => {
  return (
    <div className="account-page">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="" element={<Profile />} />
        <Route path="edit" element={<EditProfile />} />
        <Route path="address" element={<Address />} />
        <Route path="orders" element={<AllOrders />} />
      </Routes>
    </div>
  );
};

export default AccountPage;