import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../App';
import './NewRelease.css';

const NewRelease = () => {
  const [hoveredDress, setHoveredDress] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // بيانات الفساتين مع الألوان المتعددة
  const eveningGowns = [
    {
      id: 'D1',
      name: "Pinky Silk Gown",
      price: "$280.00",
      originalPrice: "$350.00",
      discount: "20% OFF",
      category: "SILK GOWNS",
      tag: "BESTSELLER",
      description: "Elegant silk gown in signature pinky colors",
      colors: [
        {
          name: "Pink",
          code: "#420e12",
          images: [
            "public/images/dress/D1/D1-1.png",
          ]
        },
        {
          name: "Black",
          code: "#393945",
          images: [
            "public/images/dress/D1/D1-2.png"
          ]
        },
        {
          name: "White",
          code: "#111111",
          images: [
            "public/images/dress/D1/D1-3.png"
          ]
        }
      ],
    },
    {
      id: 'D2',
      name: "Black Velvet Dress",
      price: "$320.00",
      originalPrice: "$400.00",
      discount: "20% OFF",
      category: "VELVET DRESSES",
      tag: "TRENDING",
      description: "Luxury black velvet with elegant design",
      colors: [
        {
          name: "Black",
          code: "#e8a9b0",
          images: [
            "public/images/dress/D2/D2-1.png"
          ]
        },
        {
          name: "Burgundy",
          code: "rgb(128 155 181)",
          images: [
            "public/images/dress/D2/D2-2.png"
          ]
        }
      ],
    },
    {
      id: 'D3',
      name: "White Sequin Gown",
      price: "$250.00",
      originalPrice: "$300.00",
      discount: "17% OFF",
      category: "SEQUIN GOWNS",
      tag: "NEW ARRIVAL",
      description: "Sparkling white sequins for glamorous events",
      colors: [
        {
          name: "White",
          code: "#494d74",
          images: [
            "public/images/dress/D3/D3-3.png",
          ]
        },
        {
          name: "Silver",
          code: "#3b5d48",
          images: [
            "public/images/dress/D3/D3-2.png"
          ]
        },
        {
          name: "Silver",
          code: "rgb(154 21 46)",
          images: [
            "public/images/dress/D3/D3-1.png"
          ]
        }
      ],
      sizes: ["M", "L", "XL"]
    },
  ];

  // دالة للحصول على الصورة المناسبة للفستان واللون
  const getDressImage = (dressId, colorIndex = 0, imageIndex = 0) => {
    const dress = eveningGowns.find(d => d.id === dressId);
    if (!dress || !dress.colors[colorIndex]) {
      return 'https://via.placeholder.com/300x400/ffb3c6/ffffff?text=Loading...';
    }
    
    // إذا كان اللون محدد مسبقاً
    const selectedColorIndex = selectedColor[dressId] || colorIndex;
    const color = dress.colors[selectedColorIndex];
    
    // استخدم الصورة الأولى كـ default
    return color.images[imageIndex] || color.images[0];
  };

  // دالة لتغيير لون الفستان
  const handleColorSelect = (dressId, colorIndex) => {
    setSelectedColor(prev => ({
      ...prev,
      [dressId]: colorIndex
    }));
  };

  // دالة لـ Quick View
  const handleQuickView = (dress) => {
    setQuickViewProduct(dress);
    // Add modal logic here or navigate to product page
    console.log('Quick view for:', dress.name);
    
    // بديل: افتح صفحة المنتج في tab جديدة
    // navigate(`/product/dress/${dress.id}`);
  };

// في NewRelease.jsx - عدل دالة handleAddToCart
const handleAddToCart = (dress) => {
  const selectedColorIndex = selectedColor[dress.id] || 0;
  const selectedColorObj = dress.colors[selectedColorIndex];
  
  // إنشاء المنتج بنفس هيكل MustHaves
  const cartItem = {
    id: dress.id, // استخدم ID بسيط
    name: dress.name,
    price: dress.price, // احتفظ بالسعر كنص
    image: selectedColorObj.images[0],
    category: dress.category,
    color: selectedColorObj.name, // أضف اللون
    colorCode: selectedColorObj.code,
    quantity: 1
  };
  
  addToCart(cartItem);
  
  // إظهار إشعار
};

  const categories = [
    { id: 'all', name: 'All Dresses', count: eveningGowns.length },
    { id: 'pink', name: 'Pink Dresses', count: eveningGowns.filter(d => d.colors.some(c => c.name === 'Pink')).length },
    { id: 'black', name: 'Black Dresses', count: eveningGowns.filter(d => d.colors.some(c => c.name === 'Black')).length },
    { id: 'white', name: 'White Dresses', count: eveningGowns.filter(d => d.colors.some(c => c.name === 'White')).length },
    { id: 'silk', name: 'Silk', count: eveningGowns.filter(d => d.category === 'SILK GOWNS').length },
    { id: 'velvet', name: 'Velvet', count: eveningGowns.filter(d => d.category === 'VELVET DRESSES').length },
    { id: 'sequin', name: 'Sequin', count: eveningGowns.filter(d => d.category === 'SEQUIN GOWNS').length }
  ];

  const filteredDresses = selectedCategory === 'all' 
    ? eveningGowns 
    : selectedCategory === 'pink'
    ? eveningGowns.filter(dress => dress.colors.some(c => c.name === 'Pink'))
    : selectedCategory === 'black'
    ? eveningGowns.filter(dress => dress.colors.some(c => c.name === 'Black'))
    : selectedCategory === 'white'
    ? eveningGowns.filter(dress => dress.colors.some(c => c.name === 'White'))
    : eveningGowns.filter(dress => dress.category.toLowerCase().includes(selectedCategory));

  return (
    <section className="evening-gowns">
      {/* خلفية Pinky Theme */}
      <div className="pinky-background">
        <div className="pinky-dot dot-1"></div>
        <div className="pinky-dot dot-2"></div>
        <div className="pinky-dot dot-3"></div>
      </div>

      <div className="gowns-container">
        {/* الهيدر */}
        <div className="gowns-header">
          <div className="pinky-header-top">
            <div className="pinky-lines">
              <span className="pinky-line"></span>
              <span className="pinky-icon">🎀</span>
              <span className="pinky-line"></span>
            </div>
            
            <h1 className="gowns-title">
              <span className="title-word">NEW </span>
              <span className="title-word">SECTION</span>
            </h1>
          </div>

          {/* الفلاتر */}
         
        </div>

        {/* عرض الفساتين */}
        <div className="gowns-grid">
          {filteredDresses.map(dress => {
            const selectedColorIndex = selectedColor[dress.id] || 0;
            const currentColor = dress.colors[selectedColorIndex];
            
            return (
              <div 
                key={dress.id}
                className="gown-card"
                onMouseEnter={() => setHoveredDress(dress.id)}
                onMouseLeave={() => setHoveredDress(null)}
              >
                {/* البادج */}
                {dress.tag && (
                  <div className={`gown-badge ${dress.tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    {dress.tag}
                  </div>
                )}

                {/* الخصم */}
                {dress.discount && (
                  <div className="discount-badge">
                    {dress.discount}
                  </div>
                )}

                {/* الصورة */}
                <div className="gown-image-container">
                  <div 
                    className={`gown-main-image ${hoveredDress === dress.id ? 'active' : ''}`}
                    style={{ 
                      backgroundImage: `url(${getDressImage(dress.id, selectedColorIndex, 0)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  
                  <div 
                    style={{ 
                      backgroundImage: `url(${getDressImage(dress.id, selectedColorIndex, 0)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {/* معلومات عند الهوفر */}
                    <div className="hover-details">
                      <div className="details-content">
                        <h3>{dress.name}</h3>
                        <p>{dress.description}</p>
                        
                        <div className="dress-specs">
                          <div className="available-colors">
                            <span>Colors:</span>
                            <div className="color-dots">
                              {dress.colors.map((color, index) => (
                                <button
                                  key={index}
                                  className={`color-dot-btn ${selectedColorIndex === index ? 'active' : ''}`}
                                  style={{ 
                                    backgroundColor: color.code,
                                    border: color.code === '#ffffff' ? '1px solid #ddd' : 'none'
                                  }}
                                  title={color.name}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleColorSelect(dress.id, index);
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                          
                        </div>

                        <div className="hover-actions">
                          <button 
                            className="quick-view-btn"
                    onClick={() => navigate(`/product/dress/${dress.id}`)}

                          >
                            <i className="fas fa-eye"></i>
                            Quick View
                          </button>
                          <button 
                            className="add-to-cart-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(dress);
                            }}
                          >
                            <i className="fas fa-shopping-bag"></i>
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* معلومات الفستان */}
                <div className="gown-info">
                  <div className="gown-header">
                    <span className="gown-category">{dress.category}</span>
                    
                  <div className="gown-pricing">
                    <span className="current-price">{dress.price}</span>
                    {dress.originalPrice && (
                      <span className="original-price">{dress.originalPrice}</span>
                    )}
                  </div>
                  </div>
                  
                  
                
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="gowns-cta">

          <div className="cta-content">
            <h2>Contact Us 🎀</h2>
          

            <div className="cta-buttons">
              <div className="facebook-community">
  <div className="community-icon">
    <i className="fab fa-facebook-f"></i>
  </div>
  <div className="community-info">
    <h3>Join Our Facebook Family</h3>
    <p>Get exclusive offers, styling tips, and be the first to see new arrivals</p>
  </div>
  <a 
    href="https://www.facebook.com/profile.php?id=61550861842638&mibextid=ZbWKwL" 
    target="_blank" 
    rel="noopener noreferrer"
    className="join-facebook-btn"
  >
    Join Now
    <i className="fas fa-arrow-right"></i>
  </a>
</div>
              <div className="whatsapp-community">
  <div className="community-icon">
    <i className="fab fa-whatsapp"></i>
  </div>
  <div className="community-info">
    <h3>Join Our WhatsApp Group</h3>
    <p>Get instant updates on new arrivals, and fashion tips directly on WhatsApp</p>
  </div>
  <a 
    href="https://chat.whatsapp.com/GYUE5HmrpO1LeWMvcWBrV7" 
    target="_blank" 
    rel="noopener noreferrer"
    className="join-whatsapp-btn"
  >
    Join Now
    <i className="fas fa-arrow-right"></i>
  </a>
</div>
            </div>
          </div>

          <div className="cta-image">
            <div className="image-frame">
              <div className="frame-content">
                <div className="store-info">
                  <h3>Visit Our Store</h3>
                  <p>Open: 10AM - 10PM</p>
                   <iframe
                title="Pinky Store Location"
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.8990179293396!2d29.57495258165867!3d30.88948580878239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f587fa3d86d4db%3A0xb7bc057855d20de1!2z2LPZitiq2Yog2YXZiNmEIENpdHkgTWFsbA!5e0!3m2!1sen!2seg!4v1766530901606!5m2!1sen!2seg"                width="100%"
                height="250"
                style={{ border: 0, borderRadius: '15px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="google-map"
              />
             
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewRelease;