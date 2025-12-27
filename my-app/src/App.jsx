// App.js
import React, { useState, useMemo, createContext, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CartPage from './components/CartPage';
import FavoritesPage from './components/FavoritesPage';
import AccountPage from './pages/AccountPage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import Notification from './components/Notification'; 
import DressProductPage from './pages/DressProductPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProducts from './pages/admin/AdminProducts';
import AdminUsers from './pages/admin/AdminUsers';
import { AuthProvider, useAuth } from './context/AuthContext';
import './testFirebase';
import './App.css';

export const CartContext = createContext();

// مكون للحماية - يمنع الوصول لصفحات عادية إذا كان إدمن
const AdminProtection = ({ children }) => {
  const { isAdmin, currentUser } = useAuth();
  const location = useLocation();
  
  // قائمة الصفحات المسموح للإدمن بالوصول إليها
  const allowedAdminPaths = [
    '/admin/dashboard',
    '/admin/orders',
    '/admin/products',
    '/admin/users',
    '/account/login',
    '/account/signup'
  ];
  
  // إذا كان إدمن ويحاول الوصول لصفحة غير مسموحة، أرجع للداشبورد
  if (isAdmin && currentUser && !allowedAdminPaths.some(path => location.pathname.startsWith(path))) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return children;
};

// مكون للحماية العكسية - يمنع المستخدم العادي من الوصول للداشبورد
const AdminRoute = ({ children }) => {
  const { isAdmin, currentUser } = useAuth();
  
  if (!currentUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('shoppingCart');
  };
  
  const getSavedCart = () => {
    try {
      const savedCart = localStorage.getItem('shoppingCart');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
    return [];
  };

  const [cart, setCart] = useState(getSavedCart());
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  useEffect(() => {
    try {
      localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cart]);

  const favoritesCount = favorites.length;

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { 
                ...item, 
                quantity: (item.quantity || 1) + 1,
                price: product.price || item.price
              }
            : item
        );
      }
      return [...prev, { 
        ...product, 
        quantity: 1,
        price: product.price || '$0.00'
      }];
    });
    showNotification(`${product.name} added to cart!`, 'success');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '')) || 0;
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  const toggleFavorite = (product) => {
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === product.id);
      if (exists) {
        return prev.filter(fav => fav.id !== product.id);
      }
      return [...prev, product];
    });
  };

  return (
    <AuthProvider>
      <CartContext.Provider value={{
        cart,
        favorites,
        cartCount,
        favoritesCount,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        clearCart,
        showNotification,
        toggleFavorite,
        notification
      }}>
        <Router>
          <AppContent />
        </Router>
      </CartContext.Provider>
    </AuthProvider>
  );
}

function AppContent() {
  const { isAdmin, currentUser, loading } = useAuth();
  const { notification } = useContext(CartContext);
  
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <AdminProtection>
        <Navbar />
        <Routes>
          {/* إذا كان مسؤولاً، توجيهه مباشرة للداشبورد */}
          {isAdmin && currentUser ? (
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
          ) : (
            <Route path="/" element={<HomePage />} />
          )}
          
          {/* الصفحات العامة - ممنوعة للإدمن */}
          <Route path="/cart" element={!isAdmin ? <CartPage /> : <Navigate to="/admin/dashboard" replace />} />
          <Route path="/favorites" element={!isAdmin ? <FavoritesPage /> : <Navigate to="/admin/dashboard" replace />} />
          <Route path="/shop" element={!isAdmin ? <ShopPage /> : <Navigate to="/admin/dashboard" replace />} />
          <Route path="/category/:categoryName" element={!isAdmin ? <ShopPage /> : <Navigate to="/admin/dashboard" replace />} />
          <Route path="/product/:id" element={!isAdmin ? <ProductPage /> : <Navigate to="/admin/dashboard" replace />} />
          <Route path="/product/dress/:id" element={!isAdmin ? <DressProductPage /> : <Navigate to="/admin/dashboard" replace />} />
          <Route path="/account/*" element={<AccountPage />} />
          <Route path="/checkout" element={!isAdmin ? <CheckoutPage /> : <Navigate to="/admin/dashboard" replace />} />
          <Route path="/order-confirmation/:orderId" element={!isAdmin ? <OrderConfirmation /> : <Navigate to="/admin/dashboard" replace />} />
          
          {/* الصفحات الإدارية - محمية */}
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          <Route path="/admin/orders" element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          } />
          <Route path="/admin/products" element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          } />
          <Route path="/admin/users" element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          } />
          
          {/* 404 */}
          <Route path="*" element={
            isAdmin ? <Navigate to="/admin/dashboard" /> : <Navigate to="/" />
          } />
        </Routes>
        <Notification 
          message={notification.message} 
          type={notification.type} 
        />
      </AdminProtection>
    </div>
  );
}

export default App;