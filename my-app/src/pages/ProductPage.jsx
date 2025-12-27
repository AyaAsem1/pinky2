import React, { useContext, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../App';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams(); // الحصول على ID المنتج من الرابط
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart } = useContext(CartContext);
  
  // بيانات المنتجات (نفسها في MustHaves)
  const allProducts = [
    {
      id: 1,
      name: "Black Power Eye Pencil",
      price: "$15.00",
      description: "A highly pigmented, long-lasting eyeliner pencil that glides on smoothly for intense definition. Waterproof and smudge-proof formula lasts all day.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Makeup",
      features: ["Waterproof", "Long-lasting", "Smudge-proof", "Intense pigmentation"],
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: "Luxe Velvet Lipstick",
      price: "$15.00",
      description: "A luxurious velvet matte lipstick with rich color payoff and comfortable wear. Provides full coverage with a velvety finish that doesn't dry out lips.",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Makeup",
      features: ["Velvet matte finish", "Hydrating formula", "Full coverage", "Transfer-resistant"],
      rating: 4.8,
      reviews: 256
    },
    {
      id: 3,
      name: "Glossy Rose",
      price: "$15.00",
      description: "A glossy lip tint with natural rose color that enhances your lips' natural beauty. Lightweight formula with subtle shimmer.",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Makeup",
      features: ["Natural shine", "Moisturizing", "Subtle color", "Non-sticky"],
      rating: 4.3,
      reviews: 89
    },
    {
      id: 4,
      name: "Full Coverage Slick Fluid Foundation",
      price: "$15.00",
      description: "A lightweight fluid foundation that provides full coverage without feeling heavy. Blends seamlessly for a natural, flawless finish.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Makeup",
      features: ["Full coverage", "Lightweight", "Long-lasting", "SPF 15"],
      rating: 4.6,
      reviews: 187
    },
    {
      id: 5,
      name: "Dazzle Pink Eyeshadow",
      price: "$15.00",
      description: "Highly pigmented pink eyeshadow with metallic finish. Creates stunning eye looks with just one swipe.",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Makeup",
      features: ["Metallic finish", "Highly pigmented", "Blendable", "Long-wearing"],
      rating: 4.4,
      reviews: 112
    },
    {
      id: 6,
      name: "Multipack Eyeshadow",
      price: "$15.00",
      description: "A versatile eyeshadow palette with multiple shades for creating endless eye looks. Includes matte and shimmer finishes.",
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Makeup",
      features: ["Multiple shades", "Matte & shimmer", "Travel-friendly", "Versatile"],
      rating: 4.7,
      reviews: 234
    }
  ];

  const [quantity, setQuantity] = useState(1);
  const product = allProducts.find(p => p.id === parseInt(id));

  // إذا لم يتم العثور على المنتج
  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <Link to="/" className="back-to-home">Back to Home</Link>
      </div>
    );
  }

  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleAddToCart = () => {
    // إضافة الكمية المحددة
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(product);
  };

  return (
    <div className="product-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/shop">Shop</Link>
        <span> / </span>
        <span>{product.name}</span>
      </div>

      <div className="product-container">
        {/* صورة المنتج */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        {/* معلومات المنتج */}
        <div className="product-details">
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-meta">
              <span className="product-category">{product.category}</span>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                    ></i>
                  ))}
                </div>
                <span className="rating-text">{product.rating} ({product.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="product-price-section">
            <span className="product-price">{product.price}</span>
            <span className="in-stock">In Stock</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>
                  <i className="fas fa-check"></i> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => prev + 1)}
              >
                +
              </button>
            </div>

            <div className="action-buttons">
              <button 
                className="add-to-cart-btn primary"
                onClick={handleAddToCart}
              >
                <i className="fas fa-shopping-bag"></i>
                Add to Cart
              </button>
              
              <button 
                className={`favorite-btn-detail ${isFavorite ? 'active' : ''}`}
                onClick={handleFavoriteToggle}
              >
                <i className={`fas fa-heart${isFavorite ? '' : ''}`}></i>
              </button>
            </div>
          </div>

         
        </div>
      </div>

      {/* منتجات مشابهة */}
      <div className="related-products">
        <h2>You May Also Like</h2>
        <div className="related-grid">
          {allProducts
            .filter(p => p.id !== product.id)
            .slice(0, 4)
            .map(relatedProduct => (
              <Link 
                to={`/product/${relatedProduct.id}`} 
                key={relatedProduct.id}
                className="related-card"
              >
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <h4>{relatedProduct.name}</h4>
                <span className="price">{relatedProduct.price}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;