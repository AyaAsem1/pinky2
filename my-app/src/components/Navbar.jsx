// components/Navbar.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CartContext } from '../App';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const { cartCount, favoritesCount } = useContext(CartContext);
  const { currentUser, isAdmin, logout } = useAuth();

  // إغلاق المنيو عند تغيير الصفحة
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // التحكم في scroll الجسم عند فتح المنيو
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setShowLogoutModal(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const showLogoutConfirmation = () => {
    setShowLogoutModal(true);
  };

  // إذا كان إدمن، اعرض navbar مبسط
  if (isAdmin && currentUser) {
    return (
      <>
        <nav className="navbar admin-navbar">
          <div className="navbar-main">
            <div className="nav-container">
              {/* Logo فقط */}
              <div className="logo">
                <Link to="/admin/dashboard">
                  <h1>PINKY</h1>
                  <span className="logo-subtitle">Admin Dashboard</span>
                </Link>
              </div>
              
              {/* الإجراءات للإدمن فقط */}
              <div className="nav-actions admin-actions">
                {/* زر الخروج من النظام الإداري */}
                <button 
                  className="icon-btn logout-admin-btn"
                  onClick={showLogoutConfirmation}
                  title="Exit Admin Mode"
                >
                  <i className="fas fa-sign-out-alt"></i>
                  <span className="admin-badge">Admin</span>
                </button>
                
                {/* Mobile Menu Toggle */}
                <button 
                  className="menu-toggle" 
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                  {menuOpen ? '✕' : '☰'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Admin Menu */}
          {menuOpen && isAdmin && (
            <div className="admin-mobile-menu">
              <div className="admin-menu-items">
                <div className="admin-user-info">
                  <div className="avatar-small">
                    {currentUser.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>Administrator</h4>
                    <p>{currentUser.email}</p>
                  </div>
                </div>
                
                <div className="admin-menu-links">
                  <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-tachometer-alt"></i>
                    Dashboard
                  </Link>
                  <Link to="/admin/orders" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-shopping-bag"></i>
                    Manage Orders
                  </Link>
                  <Link to="/admin/products" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-box"></i>
                    Manage Products
                  </Link>
                  <Link to="/admin/users" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-users"></i>
                    Manage Users
                  </Link>
                </div>
                
                <div className="admin-menu-footer">
                  <button 
                    className="btn-logout-full"
                    onClick={showLogoutConfirmation}
                  >
                    <i className="fas fa-sign-out-alt"></i>
                    Exit Admin Mode
                  </button>
                </div>
              </div>
              
              {/* Overlay */}
              <div 
                className="menu-overlay" 
                onClick={() => setMenuOpen(false)}
              />
            </div>
          )}
        </nav>

        {/* Logout Confirmation Modal */}
        {showLogoutModal && (
          <div className="modal-overlay">
            <div className="modal-content logout-modal">
              <div className="modal-header">
                <div className="modal-icon">
                  <i className="fas fa-sign-out-alt"></i>
                </div>
                <h3>Exit Admin Mode?</h3>
                <button 
                  className="modal-close"
                  onClick={() => setShowLogoutModal(false)}
                >
                  ×
                </button>
              </div>
              
              <div className="modal-body">
                <p>Are you sure you want to exit admin mode?</p>
                <p className="modal-subtext">You'll be logged out and redirected to the home page.</p>
              </div>
              
              <div className="modal-footer">
                <button 
                  className="btn-modal btn-cancel"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="btn-modal btn-logout-confirm"
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Exit Admin Mode
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // النافبار العادية للمستخدمين العاديين
  const getActiveCategory = () => {
    const path = location.pathname;
    const categoryFromUrl = searchParams.get('category');
    
    if (categoryFromUrl) {
      return categoryFromUrl.toUpperCase();
    }
    
    if (path === '/') return 'HOME';
    if (path.includes('/shop')) {
      if (!categoryFromUrl) return 'SHOP ALL';
    }
    if (path.includes('/makeup')) return 'MAKEUP';
    if (path.includes('/shoes')) return 'SHOES';
    if (path.includes('/bags')) return 'BAGS';
    if (path.includes('/dresses')) return 'DRESSES';
    if (path.includes('/accessories')) return 'ACCESSORIES';

    return 'HOME';
  };

  const activeCategory = getActiveCategory();

  const categories = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP ALL', path: '/shop' },
    { name: 'MAKEUP', path: '/shop?category=makeup' },
    { name: 'SHOES', path: '/shop?category=shoes' },
    { name: 'BAGS', path: '/shop?category=bags' },
    { name: 'DRESSES', path: '/shop?category=dresses' },
    { name: 'ACCESSORIES', path: '/shop?category=accessories' },
  ];

  const getNavLinkClass = (categoryName) => {
    let baseClass = 'nav-link';
    
    if (activeCategory === categoryName) {
      baseClass += ' active';
    }
    
    if (categoryName === 'SHOP ALL' && 
        location.pathname === '/shop' && 
        !searchParams.get('category')) {
      baseClass += ' active';
    }
    
    return baseClass;
  };

  return (
    <nav className="navbar">
      <div className="navbar-main">
        <div className="nav-container">
          <div className="logo">
            <Link to="/">
              <h1>PINKY</h1>
              <span className="logo-subtitle">Fashion & Beauty</span>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className={getNavLinkClass(category.name)}
                onClick={() => setMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          <div className="nav-actions">
            <Link to="/account" className="icon-btn" title="Account">
              <i className="fas fa-user"></i>
            </Link>
            <Link to="/favorites" className="icon-btn" title="Favorites">
              <i className="fas fa-heart"></i>
              {favoritesCount > 0 && (
                <span className="cart-count favorites-count">{favoritesCount}</span>
              )}
            </Link>
            <Link to="/cart" className="icon-btn cart-btn" title="Cart">
              <i className="fas fa-shopping-bag"></i>
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle Button */}
            <button 
              className="menu-toggle" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="menu-overlay" 
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 999
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;