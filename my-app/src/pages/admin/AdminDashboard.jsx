// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { currentUser, isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {}
  });

  const showModal = (title, message, onConfirm, onCancel = () => {}) => {
    setModalConfig({
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setShowConfirmModal(false);
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  const deleteOrder = async (orderId) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await deleteDoc(orderRef);
      
      // Update local state
      setOrders(prev => prev.filter(order => order.id !== orderId));
      
      showModal('Success', 'Order deleted successfully!', () => {});
    } catch (error) {
      console.error('Error deleting order:', error);
      showModal('Error', 'Failed to delete order', () => {});
    }
  };


  const formatAddress = (addressObj) => {
  if (!addressObj) return 'No shipping address provided';
  
  if (typeof addressObj === 'string') return addressObj;
  
  // إذا كان كائن
  const { firstName, lastName, address, city, state, zipCode, country, phone } = addressObj;
  
  const parts = [];
  if (firstName || lastName) {
    parts.push(`${firstName || ''} ${lastName || ''}`.trim());
  }
  if (address) parts.push(address);
  if (city) parts.push(city);
  if (state) parts.push(state);
  if (zipCode) parts.push(zipCode);
  if (country) parts.push(country);
  if (phone) parts.push(`Phone: ${phone}`);
  
  return parts.join(', ');
};


  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'orders');
        const snapshot = await getDocs(ordersRef);
        const ordersList = [];
        snapshot.forEach((doc) => {
          ordersList.push({ id: doc.id, ...doc.data() });
        });
        
        // Sort by date (newest first)
        ordersList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(ordersList);
      } catch (error) {
        console.error('Error fetching orders:', error);
        showModal('Error', 'Failed to load orders', () => {});
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAdmin]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      showModal('Success', 'Order status updated successfully!', () => {});
    } catch (error) {
      console.error('Error updating order:', error);
      showModal('Error', 'Failed to update order status', () => {});
    }
  };

  const handleCancelOrder = (order) => {
    showModal(
      'Cancel Order',
      'Are you sure you want to cancel and delete this order? This action cannot be undone.',
      () => {
        updateOrderStatus(order.id, 'cancelled');
        deleteOrder(order.id);
        setSelectedOrder(null);
      }
    );
  };

  if (!currentUser || !isAdmin) {
    return <Navigate to="/" />;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Admin!</p>
      </div>
      
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon revenue">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p className="stat-value">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon orders">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{orders.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <h3>Pending Orders</h3>
            <p className="stat-value">{pendingOrders}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon customers">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>Total Customers</h3>
            <p className="stat-value">{new Set(orders.map(o => o.userId)).size}</p>
          </div>
        </div>
      </div>
      
      <div className="orders-section">
        <h2>Recent Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order.id}>
                    <td>{order.orderId}</td>
                    <td>{order.userName}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <span className={`status-badge status-${order.status}`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-view"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </button>
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <div className="order-modal-content">
              <div className="order-modal-header">
                <h3>Order Details - {selectedOrder.orderId}</h3>
                <button className="modal-close" onClick={() => setSelectedOrder(null)}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="order-modal-body">
                <div className="order-section">
                  <h4>Customer Information</h4>
                  <div className="order-info-grid">
                    <div className="info-item">
                      <strong>Name:</strong> {selectedOrder.userName || 'N/A'}
                    </div>
                    <div className="info-item">
                      <strong>Email:</strong> {selectedOrder.userEmail || 'N/A'}
                    </div>
                    <div className="info-item">
                      <strong>Phone:</strong> {selectedOrder.userPhone || 'Not provided'}
                    </div>
                    <div className="info-item">
                      <strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}
                    </div>
                    <div className="info-item">
                      <strong>Status:</strong> 
                      <span className={`status-badge status-${selectedOrder.status}`}>
                        {selectedOrder.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                
              <div className="order-section">
  <h4>Shipping Address</h4>
  <div className="address-box">
    {formatAddress(selectedOrder.shippingAddress)}
  </div>
</div>
                
                <div className="order-section">
                  <h4>Order Items ({selectedOrder.items?.length || 0})</h4>
                  <div className="items-table-container">
                    <table className="items-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="item-info">
                                <img 
                                  src={item.image || '/placeholder-image.jpg'} 
                                  alt={item.name} 
                                  className="item-image" 
                                />
                                <span>{item.name || 'Unnamed Product'}</span>
                              </div>
                            </td>
                            <td>${item.price || '0.00'}</td>
                            <td>{item.quantity || 1}</td>
                            <td>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="order-section">
                  <h4>Order Summary</h4>
                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>${selectedOrder.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-modal-footer">
                <button 
                  className="btn-danger"
                  onClick={() => handleCancelOrder(selectedOrder)}
                  disabled={selectedOrder.status === 'cancelled' || selectedOrder.status === 'delivered'}
                >
                  <i className="fas fa-trash"></i>
                  Cancel Order
                </button>
                <button 
                  className="btn-primary"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h3>{modalConfig.title}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                ×
              </button>
            </div>
            <div className="custom-modal-body">
              <div className="modal-icon">
                {modalConfig.title === 'Error' ? (
                  <i className="fas fa-exclamation-circle error-icon"></i>
                ) : modalConfig.title === 'Cancel Order' ? (
                  <i className="fas fa-trash warning-icon"></i>
                ) : (
                  <i className="fas fa-check-circle success-icon"></i>
                )}
              </div>
              <p>{modalConfig.message}</p>
            </div>
            <div className="custom-modal-footer">
              {modalConfig.title === 'Cancel Order' ? (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={modalConfig.onCancel}
                  >
                    No, Keep It
                  </button>
                  <button 
                    className="btn-danger"
                    onClick={modalConfig.onConfirm}
                  >
                    Yes, Cancel Order
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn-secondary"
                    onClick={modalConfig.onCancel}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={modalConfig.onConfirm}
                  >
                    OK
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;