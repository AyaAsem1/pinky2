import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { useNavigate, Navigate } from 'react-router-dom';
import './Address.css';

const Address = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Egypt'
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userData) {
      setFormData({
        fullName: userData.fullName || '',
        phone: userData.phone || '',
        street: userData.address?.street || '',
        city: userData.address?.city || '',
        state: userData.address?.state || '',
        zipCode: userData.address?.zipCode || '',
        country: userData.address?.country || 'Egypt'
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        phone: formData.phone,
        fullName: formData.fullName,
        updatedAt: new Date().toISOString()
      });
      
      setSuccess(true);
      setTimeout(() => {
        navigate('/account');
      }, 2000);
      
    } catch (error) {
      console.error('Error updating address:', error);
      alert('Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return <Navigate to="/account/login" />;
  }

  
  return (
    <div className="address-page">
      <div className="address-header">
        <h1>Manage Addresses</h1>
        <p>Update your shipping and billing addresses</p>
      </div>

      <form onSubmit={handleSubmit} className="address-form">
        <div className="form-section">
          <h3>Contact Information</h3>
          <div className="form-group">
            <label htmlFor="fullName">
              <i className="fas fa-user"></i>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <i className="fas fa-phone"></i>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="01X XXX XXXX"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Shipping Address</h3>
          <div className="form-group">
            <label htmlFor="street">
              <i className="fas fa-road"></i>
              Street Address
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              placeholder="123 Main Street"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">
                <i className="fas fa-city"></i>
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                placeholder="Cairo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">
                <i className="fas fa-map"></i>
                State/Governorate
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                placeholder="Cairo"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">
                <i className="fas fa-mail-bulk"></i>
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="11511"
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">
                <i className="fas fa-globe"></i>
                Country
              </label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="Egypt">Egypt</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="UAE">United Arab Emirates</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Kuwait">Kuwait</option>
                <option value="Qatar">Qatar</option>
              </select>
            </div>
          </div>
        </div>

        {success && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            Address updated successfully! Redirecting...
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/account')}
            disabled={loading}
          >
            <i className="fas fa-times"></i>
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i>
                Save Address
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Address;