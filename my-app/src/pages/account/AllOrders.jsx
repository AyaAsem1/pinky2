import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate, Navigate } from 'react-router-dom';
import './Orders.css';

const AllOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;
      
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(ordersRef, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const ordersList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          ordersList.push({ 
            id: doc.id, 
            ...data,
            // التأكد من أن shippingAddress هو نص
            shippingAddress: typeof data.shippingAddress === 'object' 
              ? formatAddress(data.shippingAddress)
              : data.shippingAddress || 'Address not specified'
          });
        });
        
        ordersList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  // دالة لتحويل كائن العنوان إلى نص
  const formatAddress = (addressObj) => {
    if (!addressObj) return 'Address not specified';
    
    if (typeof addressObj === 'string') return addressObj;
    
    // إذا كان كائن
    const { street, city, state, zipCode, country } = addressObj;
    return `${street || ''}, ${city || ''}, ${state || ''} ${zipCode || ''}, ${country || ''}`.trim();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const statusCounts = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  const handleCancelOrder = async (orderId) => {
    // إضافة دالة لإلغاء الطلب
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        // هنا سيتم إضافة الكود لإلغاء الطلب في Firebase
        alert('Order cancellation feature coming soon!');
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order');
      }
    }
  };

  if (!currentUser) {
    return <Navigate to="/account/login" />;
  }

  return (
    <div className="orders-page">
       <div className="orders-header">
      <h1>My Orders</h1>
      <p className="gradient-underline">Track and manage all your orders</p>
    </div>

      <div className="orders-filters">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            <span className="filter-text">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            <span className="filter-count">{count}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-orders">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="no-orders">
          <i className="fas fa-shopping-bag"></i>
          <h3>No orders found</h3>
          <p>You don't have any orders with this status yet.</p>
          <button 
            className="btn-primary"
            onClick={() => navigate('/shop')}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-container">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-detail-card">
              <div className="order-header">
                <div className="order-info">
                  <h4>Order #{order.orderId}</h4>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-status-group">
                  <span className={`status-badge status-${order.status}`}>
                    {order.status.toUpperCase()}
                  </span>
                  <span className="order-total">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                </div>
              </div>

              <div className="order-items-details">
                <h5>Items ({order.items?.length || 0})</h5>
                <div className="items-grid">
                  {order.items?.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-image">
                        <img src={item.image || '/placeholder.jpg'} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h6>{item.name}</h6>
                        <p className="item-price">${item.price || '0.00'} × {item.quantity || 1}</p>
                        <p className="item-subtotal">
                          Subtotal: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-footer">
                <div className="shipping-info">
                  <p><strong>Shipping to:</strong> {order.shippingAddress}</p>
                </div>
                <div className="order-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => navigate(`/order-confirmation/${order.id}`)}
                  >
                    <i className="fas fa-receipt"></i>
                    View Invoice
                  </button>
                  {order.status === 'pending' && (
                    <button 
                      className="btn-danger"
                      onClick={() => handleCancelOrder(order.id)}
                    >
                      <i className="fas fa-times"></i>
                      Cancel Order
                    </button>
                  )}
               
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;