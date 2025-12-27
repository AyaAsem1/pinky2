// pages/DressProductPage.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../App';
import './DressProductPage.css';

const DressProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // بيانات الفساتين الكاملة
  const dressesData = [
    {
      id: 'D1',
      name: "Pinky Silk Gown",
      price: "$280.00",
      originalPrice: "$350.00",
      discount: "20% OFF",
      category: "SILK GOWNS",
      tag: "BESTSELLER",
      description: "Elegant silk gown in signature pinky colors. Made from premium silk with delicate embroidery and a flowing silhouette perfect for special occasions.",
      colors: [
        {
          name: "Pink",
          code: "#420e12",
          images: [
            "/images/dress/D1/D1-1.png",
          ]
        },
        {
          name: "Black",
          code: "#393945",
          images: [
            "/images/dress/D1/D1-2.png"
          ]
        },
        {
          name: "White",
          code: "#111111",
          images: [
            "/images/dress/D1/D1-3.png"
          ]
        }
      ],
      features: [
        "Premium Silk Fabric",
        "Hand Embroidery",
        "Flowing Silhouette",
        "Adjustable Straps",
        "Hidden Zipper"
      ],
      care: "Dry clean only. Do not bleach. Iron on low heat.",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 'D2',
      name: "Black Velvet Dress",
      price: "$320.00",
      originalPrice: "$400.00",
      discount: "20% OFF",
      category: "VELVET DRESSES",
      tag: "TRENDING",
      description: "Luxury black velvet with elegant design. Perfect for evening events and special occasions.",
      colors: [
        {
          name: "Black",
          code: "#e8a9b0",
          images: [
            "/images/dress/D2/D2-1.png"
          ]
        },
        {
          name: "Burgundy",
          code: "rgb(128, 155, 181)",
          images: [
            "/images/dress/D2/D2-2.png"
          ]
        }
      ],
      features: [
        "Premium Velvet Fabric",
        "Elegant Design",
        "Perfect Fit",
        "Evening Wear"
      ],
      care: "Dry clean only. Keep away from direct sunlight.",
      rating: 4.6,
      reviews: 89
    },
    {
      id: 'D3',
      name: "White Sequin Gown",
      price: "$250.00",
      originalPrice: "$300.00",
      discount: "17% OFF",
      category: "SEQUIN GOWNS",
      tag: "NEW ARRIVAL",
      description: "Sparkling white sequins for glamorous events. Stunning design that catches the light beautifully.",
      colors: [
        {
          name: "White",
          code: "#494d74",
          images: [
            "/images/dress/D3/D3-3.png",
          ]
        },
        {
          name: "Silver",
          code: "#3b5d48",
          images: [
            "/images/dress/D3/D3-2.png"
          ]
        },
        {
          name: "Gold",
          code: "rgb(154, 21, 46)",
          images: [
            "/images/dress/D3/D3-1.png"
          ]
        }
      ],
      features: [
        "Hand-sewn Sequins",
        "Sparkling Finish",
        "Glamorous Design",
        "Perfect for Parties"
      ],
      care: "Dry clean only. Store in garment bag.",
      rating: 4.7,
      reviews: 203
    }
  ];

  // قراءة اللون المختار من localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem('selectedDressColor');
    if (savedColor) {
      const { dressId, colorIndex } = JSON.parse(savedColor);
      if (dressId === id) {
        setSelectedColor(colorIndex);
      }
      // نظف localStorage بعد الاستخدام
      localStorage.removeItem('selectedDressColor');
    }
  }, [id]);

  const dress = dressesData.find(d => d.id === id);

  if (!dress) {
    return (
      <div className="product-not-found">
        <h2>Dress Not Found</h2>
        <p>Sorry, the dress you're looking for doesn't exist.</p>
        <Link to="/" className="back-to-home">Back to Home</Link>
      </div>
    );
  }

  const currentColor = dress.colors[selectedColor];
  const currentImages = currentColor.images;

  const handleAddToCart = () => {
    const cartItem = {
      id: `${dress.id}-${currentColor.name}-${Date.now()}`,
      name: dress.name,
      price: parseFloat(dress.price.replace('$', '').replace(',', '')),
      color: currentColor.name,
      colorCode: currentColor.code,
      image: currentImages[0],
      category: dress.category,
      quantity: quantity
    };
    
    addToCart(cartItem);
  };

  // دالة لتحميل صورة بديلة إذا فشل التحميل
  const handleImageError = (e, imageName) => {
    console.error(`Failed to load image: ${imageName}`);
    e.target.src = `https://via.placeholder.com/600x800/ffb3c6/ffffff?text=${dress.name}+${currentColor.name}`;
  };

  return (
    <div className="product-page dress-product-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/shop?category=dresses">Dresses</Link>
        <span> / </span>
        <span>{dress.name}</span>
      </div>

      <div className="product-container">
        {/* صور المنتج */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={currentImages[selectedImage]} 
              alt={`${dress.name} - ${currentColor.name}`}
              onError={(e) => handleImageError(e, currentImages[selectedImage])}
            />
          </div>
          
          {currentImages.length > 1 && (
            <div className="image-thumbnails">
              {currentImages.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={img} 
                    alt={`View ${index + 1}`}
                    onError={(e) => handleImageError(e, `Thumbnail ${index + 1}`)}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* تفاصيل المنتج */}
        <div className="product-details">
          <div className="product-header">
            {dress.tag && (
              <div className="product-tag">{dress.tag}</div>
            )}
            <h1 className="product-title">{dress.name}</h1>
            <div className="product-meta">
              <span className="product-category">{dress.category}</span>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < Math.floor(dress.rating) ? 'filled' : ''}`}
                    ></i>
                  ))}
                </div>
                <span className="rating-text">{dress.rating} ({dress.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="product-price-section">
            <span className="product-price">{dress.price}</span>
            {dress.originalPrice && (
              <span className="original-price">{dress.originalPrice}</span>
            )}
            {dress.discount && (
              <span className="discount-badge">{dress.discount}</span>
            )}
          </div>

          {/* اختيار الألوان */}
          <div className="color-selection-section">
            <h3>Color: </h3>
            <div className="color-options">
              {dress.colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-option ${selectedColor === index ? 'active' : ''}`}
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                  onClick={() => {
                    setSelectedColor(index);
                    setSelectedImage(0); // Reset to first image when color changes
                  }}
                >
                </button>
              ))}
            </div>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{dress.description}</p>
          </div>

          {/* إضافة للعربة */}
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
                className="whatsapp-btn"
                onClick={() => {
                  const message = `Hello! I'm interested in ${dress.name} in ${currentColor.name} color. Price: ${dress.price}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                }}
              >
                <i className="fab fa-whatsapp"></i>
                Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* المنتجات المشابهة */}
      <div className="related-products">
        <h2>You May Also Like</h2>
        <div className="related-grid">
          {dressesData
            .filter(d => d.id !== dress.id)
            .slice(0, 3)
            .map(relatedDress => (
              <div 
                key={relatedDress.id}
                className="related-card"
                onClick={() => navigate(`/product/dress/${relatedDress.id}`)}
              >
                <div className="related-image">
                  <img 
                    src={relatedDress.colors[0].images[0]} 
                    alt={relatedDress.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x400/ffb3c6/ffffff?text=${relatedDress.name}`;
                    }}
                  />
                  {relatedDress.tag && (
                    <div className="related-tag">{relatedDress.tag}</div>
                  )}
                </div>
                <div className="related-info">
                  <h4>{relatedDress.name}</h4>
                  <div className="related-price">
                    <span className="price">{relatedDress.price}</span>
                    {relatedDress.originalPrice && (
                      <span className="original">{relatedDress.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DressProductPage;