import React, { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../App';
import { Link } from 'react-router-dom';
import './MustHaves.css';

const MustHaves = () => {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const { favorites, toggleFavorite, addToCart } = useContext(CartContext);
  
  const products = [
    {
      id: 1,
      name: "Black Power Eye Pencil",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Luxe Velvet Lipstick",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&brightness=70%"
    },
    {
      id: 3,
      name: "Glossy Rose",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&brightness=70%"
    },
    {
      id: 4,
      name: "Full Coverage Slick Fluid Foundation",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&brightness=70%"
    },
    {
      id: 5,
      name: "Dazzle Pink Eyeshadow",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&brightness=70%"
    },
    {
      id: 6,
      name: "Multipack Eyeshadow",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&brightness=70%"
    }
  ];

  // تعريف دالة isFavorite بشكل آمن
  const isFavorite = (productId) => {
    return favorites && Array.isArray(favorites) 
      ? favorites.some(fav => fav && fav.id === productId)
      : false;
  };

  const handleFavoriteClick = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFavorite) {
      toggleFavorite(product);
    }
  };

  const handleCartClick = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart) {
      addToCart(product);
    }
  };

  return (
    <section className="must-haves">
      <div className="section-header">
        <h2 className="section-title">MUST HAVES</h2>
        <p className="section-subtitle">Best Sellers</p>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="product-card"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* الصورة بدون رابط - فقط عرض */}
            <div className="product-image">
              <div 
                className={`image-main ${hoveredProduct === product.id ? 'hovered' : ''}`}
                style={{ backgroundImage: `url(${product.image})` }}
              >
              </div>
              <div 
                className={`image-hover ${hoveredProduct === product.id ? 'active' : ''}`}
                style={{ backgroundImage: `url(${product.hoverImage})` }}
              >
              </div>
              
              {/* أيقونات في الأعلى - تظهر عند الهوفر */}
              <div className={`product-top-icons ${hoveredProduct === product.id ? 'visible' : ''}`}>
                <button 
                  className={`favorite-btn ${isFavorite(product.id) ? 'favorited' : ''}`}
                  onClick={(e) => handleFavoriteClick(product, e)}
                  title={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite(product.id) ? (
                    <i className="fas fa-heart"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </button>
                <button 
                  className="add-icon-btn"
                  onClick={(e) => handleCartClick(product, e)}
                  title="Add to cart"
                >
                  <i className="fas fa-shopping-bag"></i>
                </button>
              </div>
              
              {/* السعر يظهر عند الهوفر */}
              <div className={`product-hover-price ${hoveredProduct === product.id ? 'show' : ''}`}>
                <span className="price-value">{product.price}</span>
              </div>
            </div>
            
            <div className="product-info">
              {/* رابط فقط على اسم المنتج */}
              <Link to={`/product/${product.id}`} className="product-name-link">
                <h3 className="product-name">{product.name}</h3>
              </Link>
              <p className="product-price-mobile">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MustHaves;