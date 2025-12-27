// pages/ShopPage.jsx
import React, { useState, useEffect ,useContext} from 'react';
import { useSearchParams ,useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../App';
import './ShopPage.css';

const ShopPage = ({ category: propCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedSubCategory, setSelectedSubCategory] = useState('All Shoes');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // 9 كاردات في كل صفحة
  const { addToCart } = useContext(CartContext);

useEffect(() => {
  const urlCategory = searchParams.get('category');
  
  // إذا كان هناك category في URL، قم بتحديث الحالة
  if (urlCategory) {
    setSelectedCategory(urlCategory.toUpperCase());
    setSelectedSubCategory(getDefaultSubCategory(urlCategory.toUpperCase()));
    setCurrentPage(1);
  } else if (propCategory) {
    // التعامل مع propCategory
    const category = propCategory.toUpperCase();
    setSelectedCategory(category);
    setSelectedSubCategory(getDefaultSubCategory(category));
    setCurrentPage(1);
  } else {
    // إذا لم يكن هناك category، افترض SHOP ALL
    setSelectedCategory('ALL');
    setSelectedSubCategory('All Products');
    setCurrentPage(1);
  }
}, [searchParams, propCategory]);


const getDefaultSubCategory = (category) => {
  switch(category) {
    case 'SHOES': return 'All Shoes';
    case 'BAGS': return 'All Bags';
    case 'ACCESSORIES': return 'All Accessories';
    case 'DRESSES': return 'All Dresses';
    case 'MAKEUP': return 'Face';
    default: return 'All Products';
  }
};

  // بعد الـ useEffect مباشرة، أضف هذه الدالة
const handleAddToCart = (product) => {
  try {
    // تحويل السعر
    const priceValue = product.price.replace('$', '').replace(',', '');
    const priceNumber = parseFloat(priceValue) || 0;
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: `$${priceNumber.toFixed(2)}`,
      image: product.image,
      category: product.category || product.categoryName || 'general',
      quantity: 1
    };
    
    console.log('Adding to cart from ShopPage:', cartItem);
    addToCart(cartItem);
    
    // إظهار إشعار
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};


  // Check which category page we're on
  const isMakeupPage = selectedCategory === 'MAKEUP';
  const isShoesPage = selectedCategory === 'SHOES';
  const isBagsPage = selectedCategory === 'BAGS';
  const isDressesPage = selectedCategory === 'DRESSES';
  const isAccessoriesPage = selectedCategory === 'ACCESSORIES';


  // ============ MAKEUP PAGE DATA (كما هي بدون تغيير) ============
  const makeupSubcategories = [
    { id: 'face', name: 'Face' },
    { id: 'eyes', name: 'Eyes' },
    { id: 'lips', name: 'Lips' },
    { id: 'oral', name: 'Oral Care' },
    { id: 'facial', name: 'Facial Care' },
    { id: 'deodorant', name: 'Deodorant' },
    { id: 'bath', name: 'Bath & Oil' }
  ];


  // Makeup Products Database - Exactly like image
  const makeupProducts = {
    face: [
      { 
        id: 1, 
        name: "Too Faced Born This Way Loose Setting Powder", 
        price: "$18.00", 
        originalPrice: "$22.00",
        discount: "18%",
        image: "../public/images/makeup face/beauty.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 15%"
      },
      { 
        id: 2, 
        name: "Beauty Pressed Finishing Powder", 
        price: "$24.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup face/DrHauschka_CompactPowder.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 3, 
        name: "Dr. Hauschka Compact Powder", 
        price: "$18.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup face/elf.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 4, 
        name: "Dr. Hauschka Compact Powder", 
        price: "$18.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup face/loreal_true_match.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 5, 
        name: "NARS Light Reflecting Powder", 
        price: "$32.00", 
        originalPrice: "$38.00",
        discount: "16%",
        image: "../public/images/makeup face/EX1.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 10%"
      },
      { 
        id: 6, 
        name: "NARS Light Reflecting Powder", 
        price: "$32.00", 
        originalPrice: "$38.00",
        discount: "16%",
        image: "../public/images/makeup face/lucy_minerals.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 10%"
      },
      { 
        id: 7, 
        name: "NARS Light Reflecting Powder", 
        price: "$32.00", 
        originalPrice: "$38.00",
        discount: "16%",
        image: "../public/images/makeup face/mac.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 10%"
      },
      { 
        id: 8, 
        name: "Too Faced Born This Way Loose Setting Powder", 
        price: "$18.00", 
        originalPrice: "$22.00",
        discount: "18%",
        image: "../public/images/makeup face/pupa.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 15%"
      },
      { 
        id: 9, 
        name: "Beauty Pressed Finishing Powder", 
        price: "$24.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup face/pur.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
        { 
        id: 10, 
        name: "Dr. Hauschka Compact Powder", 
        price: "$18.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup face/revlon_colorstay.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 11, 
        name: "Dr. Hauschka Compact Powder", 
        price: "$18.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup face/Too_Faced.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 12, 
        name: "NARS Light Reflecting Powder", 
        price: "$32.00", 
        originalPrice: "$38.00",
        discount: "16%",
        image: "../public/images/makeup face/wet_wild.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 10%"
      },
    ],
    eyes: [
      { 
        id: 13, 
        name: "Black Power Eye Pencil", 
        price: "$15.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup eyes/10725812.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 14, 
        name: "Mascara Volume Unlimited", 
        price: "$21.00", 
        originalPrice: "$25.00",
        discount: "16%",
        image: "../public/images/makeup eyes/Lancome.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Best Seller"
      },
      { 
        id: 15, 
        name: "Black Power Eye Pencil", 
        price: "$15.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup eyes/1553526549-dior-1553526540.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 16, 
        name: "Mascara Volume Unlimited", 
        price: "$21.00", 
        originalPrice: "$25.00",
        discount: "16%",
        image: "../public/images/makeup eyes/mascara_cap_off-black-web_ready_1.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Best Seller"
      },
      { 
        id: 17, 
        name: "Black Power Eye Pencil", 
        price: "$15.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup eyes/big-look-mascara-cap-on-appl-to-side.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 18, 
        name: "Mascara Volume Unlimited", 
        price: "$21.00", 
        originalPrice: "$25.00",
        discount: "16%",
        image: "../public/images/makeup eyes/SODA_POP_EYESHADOW.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Best Seller"
      },
      { 
        id: 19, 
        name: "Black Power Eye Pencil", 
        price: "$15.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup eyes/EXPERT_WEAR_EYE_SHADOW.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 20, 
        name: "Mascara Volume Unlimited", 
        price: "$21.00", 
        originalPrice: "$25.00",
        discount: "16%",
        image: "../public/images/makeup eyes/THE_ROCK_NUDES_EYE_SHADOW.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Best Seller"
      },
      { 
        id: 21, 
        name: "Black Power Eye Pencil", 
        price: "$15.00", 
        originalPrice: null,
        discount: null,
        image: "../public/images/makeup eyes/THE-CITY_MINI_PALETTE.webp",
        pieces: "1pc(s)",
        isTopSeller: false
      },
   
    ],
    lips: [
      { 
        id: 22, 
        name: "Luxe Velvet Lipstick", 
        price: "$15.00", 
        originalPrice: "$18.00",
        discount: "17%",
        image: "../public/images/makeup lips/badass-icon.webp",
        pieces: "1pc(s)",
        isTopSeller: false,
        topText: "Top 20%"
      },
      { 
        id: 23, 
        name: "Luxe Velvet Lipstick", 
        price: "$15.00", 
        originalPrice: "$18.00",
        discount: "17%",
        image: "../public/images/makeup lips/covergirl-melting-pout-vinyl-wow.webp",
        pieces: "1pc(s)",
        isTopSeller: false,
        topText: "Top 20%"
      },
      { 
        id: 24, 
        name: "Luxe Velvet Lipstick", 
        price: "$15.00", 
        originalPrice: "$18.00",
        discount: "17%",
        image: "../public/images/makeup lips/Gel-Semi-Matte.webp",
        pieces: "1pc(s)",
        isTopSeller: false,
        topText: "Top 20%"
      },
      { 
        id: 25, 
        name: "Luxe Velvet Lipstick", 
        price: "$15.00", 
        originalPrice: "$18.00",
        discount: "17%",
        image: "../public/images/makeup lips/gosh_lip_gloss.webp",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 20%"
      },
      { 
        id: 26, 
        name: "Luxe Velvet Lipstick", 
        price: "$15.00", 
        originalPrice: "$18.00",
        discount: "17%",
        image: "../public/images/makeup lips/nars-lipstick-dressed-to-kill.webp",
        pieces: "1pc(s)",
        isTopSeller: false,
        topText: "Top 20%"
      },
      { 
        id: 27, 
        name: "Luxe Velvet Lipstick", 
        price: "$15.00", 
        originalPrice: "$18.00",
        discount: "17%",
        image: "../public/images/makeup lips/VIVA.webp",
        pieces: "1pc(s)",
        isTopSeller: false,
        topText: "Top 20%"
      },
    ]
  };

// ============ SHOES PAGE DATA ============
  const shoesSubcategories = [
    { id: 'all', name: 'All Shoes' },
    { id: 'heels', name: 'High Heels' },
    { id: 'sneakers', name: 'Sneakers' },
    { id: 'sandals', name: 'Sandals' },
    { id: 'boots', name: 'Boots' },
    { id: 'flats', name: 'Flats' },
    { id: 'wedges', name: 'Wedges' }
  ];

  const shoesProducts = {
    'all': [
      { 
        id: 1, 
        name: "Elegant Stiletto Heels", 
        price: "$89.00", 
        originalPrice: "$120.00",
        discount: "26%",
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Best Seller"
      },
      { 
        id: 2, 
        name: "White Platform Sneakers", 
        price: "$65.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 3, 
        name: "Leather Ankle Boots", 
        price: "$110.00", 
        originalPrice: "$140.00",
        discount: "21%",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top 10%"
      },
      { 
        id: 4, 
        name: "Summer Gladiator Sandals", 
        price: "$45.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 5, 
        name: "Comfort Ballet Flats", 
        price: "$55.00", 
        originalPrice: "$70.00",
        discount: "21%",
        image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Most Comfortable"
      },
      { 
        id: 6, 
        name: "Designer Platform Wedges", 
        price: "$95.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1575456453252-2617e59bc8d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 7, 
        name: "Sporty Running Sneakers", 
        price: "$75.00", 
        originalPrice: "$90.00",
        discount: "17%",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top Rated"
      },
      { 
        id: 8, 
        name: "Evening Party Pumps", 
        price: "$120.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1518047601543-54d0b5f148c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 9, 
        name: "Casual Loafers", 
        price: "$85.00", 
        originalPrice: "$100.00",
        discount: "15%",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Trending"
      }
    ],
    'heels': [
      { 
        id: 10, 
        name: "Red Velvet Heels", 
        price: "$125.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "New Arrival"
      }
    ],
    'sneakers': [
      { 
        id: 11, 
        name: "Classic White Sneakers", 
        price: "$70.00", 
        originalPrice: "$85.00",
        discount: "18%",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Best Seller"
      }
    ]
  };
  // ============ END SHOES PAGE ============

  // ============ BAGS PAGE DATA ============
  const bagsSubcategories = [
    { id: 'all', name: 'All Bags' },
    { id: 'handbags', name: 'Handbags' },
    { id: 'shoulder', name: 'Shoulder Bags' },
    { id: 'tote', name: 'Tote Bags' },
    { id: 'clutch', name: 'Clutches' },
    { id: 'backpack', name: 'Backpacks' },
    { id: 'crossbody', name: 'Crossbody' }
  ];

  const bagsProducts = {
    'all': [
      { 
        id: 1, 
        name: "Designer Leather Handbag", 
        price: "$250.00", 
        originalPrice: "$320.00",
        discount: "22%",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Luxury Pick"
      },
      { 
        id: 2, 
        name: "Elegant Evening Clutch", 
        price: "$89.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 3, 
        name: "Chic Shoulder Bag", 
        price: "$150.00", 
        originalPrice: "$180.00",
        discount: "17%",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top Rated"
      },
      { 
        id: 4, 
        name: "Casual Tote Bag", 
        price: "$75.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 5, 
        name: "Leather Backpack", 
        price: "$180.00", 
        originalPrice: "$220.00",
        discount: "18%",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Most Wanted"
      },
      { 
        id: 6, 
        name: "Mini Crossbody Bag", 
        price: "$95.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 7, 
        name: "Designer Satchel", 
        price: "$320.00", 
        originalPrice: "$400.00",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Premium Collection"
      },
      { 
        id: 8, 
        name: "Summer Straw Bag", 
        price: "$65.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 9, 
        name: "Evening Beaded Clutch", 
        price: "$120.00", 
        originalPrice: "$150.00",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Glamorous"
      }
    ],
    'handbags': [
      { 
        id: 10, 
        name: "Classic Leather Handbag", 
        price: "$280.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Luxury"
      }
    ]
  };
  // ============ END BAGS PAGE ============

  // ============ ACCESSORIES PAGE DATA ============
  const accessoriesSubcategories = [
    { id: 'all', name: 'All Accessories' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'watches', name: 'Watches' },
    { id: 'sunglasses', name: 'Sunglasses' },
    { id: 'scarves', name: 'Scarves' },
    { id: 'belts', name: 'Belts' },
    { id: 'hats', name: 'Hats' }
  ];

  const accessoriesProducts = {
    'all': [
      { 
        id: 1, 
        name: "Pearl Drop Earrings", 
        price: "$45.00", 
        originalPrice: "$60.00",
        discount: "25%",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Elegant"
      },
      { 
        id: 2, 
        name: "Designer Sunglasses", 
        price: "$120.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 3, 
        name: "Gold Plated Necklace", 
        price: "$85.00", 
        originalPrice: "$110.00",
        discount: "23%",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Top Rated"
      },
      { 
        id: 4, 
        name: "Leather Fashion Belt", 
        price: "$55.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 5, 
        name: "Silk Designer Scarf", 
        price: "$75.00", 
        originalPrice: "$95.00",
        discount: "21%",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Luxury"
      },
      { 
        id: 6, 
        name: "Straw Summer Hat", 
        price: "$65.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1529958030586-3aae4ca485ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 7, 
        name: "Diamond Bracelet", 
        price: "$350.00", 
        originalPrice: "$450.00",
        discount: "22%",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Premium"
      },
      { 
        id: 8, 
        name: "Classic Leather Watch", 
        price: "$180.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 9, 
        name: "Stackable Rings Set", 
        price: "$95.00", 
        originalPrice: "$120.00",
        discount: "21%",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Trending"
      }
    ],
    'jewelry': [
      { 
        id: 10, 
        name: "Gold Hoop Earrings", 
        price: "$65.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Classic"
      }
    ]
  };
  // ============ END ACCESSORIES PAGE ============

  // ============ DRESSES PAGE DATA ============
  const dressesSubcategories = [
    { id: 'all', name: 'All Dresses' },
    { id: 'evening', name: 'Evening Dresses' },
    { id: 'casual', name: 'Casual Dresses' },
    { id: 'cocktail', name: 'Cocktail Dresses' },
    { id: 'wedding', name: 'Wedding Dresses' },
    { id: 'summer', name: 'Summer Dresses' },
    { id: 'maxi', name: 'Maxi Dresses' }
  ];

  const dressesProducts = {
    'all': [
      { 
        id: 1, 
        name: "Elegant Evening Gown", 
        price: "$280.00", 
        originalPrice: "$350.00",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Red Carpet"
      },
      { 
        id: 2, 
        name: "Floral Summer Dress", 
        price: "$85.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 3, 
        name: "Little Black Dress", 
        price: "$120.00", 
        originalPrice: "$150.00",
        discount: "20%",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Classic"
      },
      { 
        id: 4, 
        name: "Casual Cotton Dress", 
        price: "$65.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 5, 
        name: "Designer Cocktail Dress", 
        price: "$250.00", 
        originalPrice: "$320.00",
        discount: "22%",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Party Ready"
      },
      { 
        id: 6, 
        name: "Bohemian Maxi Dress", 
        price: "$95.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 7, 
        name: "Silk Slip Dress", 
        price: "$180.00", 
        originalPrice: "$220.00",
        discount: "18%",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Luxurious"
      },
      { 
        id: 8, 
        name: "Polka Dot Dress", 
        price: "$75.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: false
      },
      { 
        id: 9, 
        name: "Formal Ball Gown", 
        price: "$450.00", 
        originalPrice: "$550.00",
        discount: "18%",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "Grand"
      }
    ],
    'evening': [
      { 
        id: 10, 
        name: "Red Carpet Gown", 
        price: "$520.00", 
        originalPrice: null,
        discount: null,
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500&q=80",
        pieces: "1pc(s)",
        isTopSeller: true,
        topText: "VIP"
      }
    ]
  };
  // ============ END DRESSES PAGE ============

  // Get current page data based on category
  const getAllProducts = () => {
    // Makeup Products
    const allMakeupProducts = [
      ...(makeupProducts.face || []),
      ...(makeupProducts.eyes || []),
      ...(makeupProducts.lips || [])
    ].map(product => ({
      ...product,
      category: 'makeup',
      categoryName: 'MAKEUP'
    }));

    // Shoes Products
    const allShoesProducts = (shoesProducts.all || []).map(product => ({
      ...product,
      category: 'shoes',
      categoryName: 'SHOES'
    }));

    // Bags Products
    const allBagsProducts = (bagsProducts.all || []).map(product => ({
      ...product,
      category: 'bags',
      categoryName: 'BAGS'
    }));

    // Dresses Products
    const allDressesProducts = (dressesProducts.all || []).map(product => ({
      ...product,
      category: 'dresses',
      categoryName: 'DRESSES'
    }));

    // Accessories Products
    const allAccessoriesProducts = (accessoriesProducts.all || []).map(product => ({
      ...product,
      category: 'accessories',
      categoryName: 'ACCESSORIES'
    }));

    // دمج كل المنتجات
    return [
      ...allMakeupProducts,
      ...allShoesProducts,
      ...allBagsProducts,
      ...allDressesProducts,
      ...allAccessoriesProducts
    ];
  };

  const allProducts = getAllProducts();

  // Get current page data for category pages
  const getCurrentPageData = () => {
    if (isMakeupPage) {
      return {
        title: "MAKEUP",
        subtitle: "Premium Beauty Collection",
        subcategories: makeupSubcategories,
        products: makeupProducts[selectedSubCategory.toLowerCase()] || [],
        currentCategory: selectedSubCategory,
        showPagination: false
      };
    } else if (isShoesPage) {
      return {
        title: "SHOES",
        subtitle: "Trendy Footwear Collection",
        subcategories: shoesSubcategories,
        products: shoesProducts[selectedSubCategory.toLowerCase().replace(' ', '')] || shoesProducts['all'],
        currentCategory: selectedSubCategory,
        showPagination: false
      };
    } else if (isBagsPage) {
      return {
        title: "BAGS",
        subtitle: "Chic Handbags & Accessories",
        subcategories: bagsSubcategories,
        products: bagsProducts[selectedSubCategory.toLowerCase().replace(' ', '')] || bagsProducts['all'],
        currentCategory: selectedSubCategory,
        showPagination: false
      };
    } else if (isDressesPage) {
      return {
        title: "DRESSES",
        subtitle: "Elegant Outfits for You",
        subcategories: dressesSubcategories,
        products: dressesProducts[selectedSubCategory.toLowerCase().replace(' ', '')] || dressesProducts['all'],
        currentCategory: selectedSubCategory,
        showPagination: false
      };
    } else if (isAccessoriesPage) {
      return {
        title: "ACCESSORIES",
        subtitle: "Complete Your Look",
        subcategories: accessoriesSubcategories,
        products: accessoriesProducts[selectedSubCategory.toLowerCase().replace(' ', '')] || accessoriesProducts['all'],
        currentCategory: selectedSubCategory,
        showPagination: false
      };
    }
    return null;
  };

  const pageData = getCurrentPageData();

  // Pagination logic for SHOP ALL
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show first page, current page, and last page with ellipsis
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = startPage; i <= endPage; i++) {
        if (!pageNumbers.includes(i)) {
          pageNumbers.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      if (!pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  // Render category page if we're on a specific category
  if (pageData) {
    return (
      <motion.div 
        className="makeup-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Category Header */}
        <div className="makeup-header">
          <h1 className="makeup-title">{pageData.title}</h1>
          <p className="makeup-subtitle">{pageData.subtitle}</p>
        </div>

        {/* Categories Sidebar */}
        <div className="makeup-container">
          <div className="makeup-sidebar">
            <h2 className="sidebar-title">Categories</h2>
            <div className="sidebar-categories">
              {pageData.subcategories.map(cat => (
                <button
                  key={cat.id}
                  className={`sidebar-category ${pageData.currentCategory === cat.name ? 'active-sidebar-category' : ''}`}
                  onClick={() => setSelectedSubCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="makeup-products-section">
            <div className="makeup-products-grid">
              {pageData.products.map(product => (
                <motion.div 
                  key={product.id} 
                  className="makeup-product-card"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Top Seller Badge */}
                  {product.isTopSeller && (
                    <div className="top-seller-badge">
                      {product.topText || "Top Seller"}
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="makeup-product-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300x300/ffb3c6/ffffff?text=${product.name}`;
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="makeup-product-info">
                    <h3 className="makeup-product-name">{product.name}</h3>
                    <p className="makeup-product-pieces">{product.pieces}</p>
                    
                    <div className="makeup-price-section">
                      {product.originalPrice ? (
                        <>
                          <span className="makeup-original-price">{product.originalPrice}</span>
                          <span className="makeup-current-price">{product.price}</span>
                          {product.discount && (
                            <span className="makeup-discount">-{product.discount}</span>
                          )}
                        </>
                      ) : (
                        <span className="makeup-current-price">{product.price}</span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                   <button 
  className="makeup-add-to-cart"
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCart(product);
  }}
>
  <i className="fas fa-shopping-bag"></i>
  Add to Cart
</button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Pagination for Category Pages */}
            {pageData.showPagination && pageData.products.length > productsPerPage && (
              <div className="category-pagination">
                <button 
                  className="pagination-btn prev"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <i className="fas fa-chevron-left"></i> Previous
                </button>
                <div className="page-numbers">
                  {getPageNumbers().map((number, index) => (
                    number === '...' ? (
                      <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
                    ) : (
                      <button
                        key={number}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                        onClick={() => setCurrentPage(number)}
                      >
                        {number}
                      </button>
                    )
                  ))}
                </div>
                <button 
                  className="pagination-btn next"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // SHOP ALL, NEW ARRIVALS, BEST SELLERS Page
  const categories = [
    { id: 'all', name: 'SHOP ALL', count: allProducts.length },
    { id: 'makeup', name: 'MAKEUP', count: allProducts.filter(p => p.category === 'makeup').length },
    { id: 'shoes', name: 'SHOES', count: allProducts.filter(p => p.category === 'shoes').length },
    { id: 'bags', name: 'BAGS', count: allProducts.filter(p => p.category === 'bags').length },
    { id: 'dresses', name: 'DRESSES', count: allProducts.filter(p => p.category === 'dresses').length },
    { id: 'accessories', name: 'ACCESSORIES', count: allProducts.filter(p => p.category === 'accessories').length }
  ];

  // Filter products based on selected category
  const getFilteredProducts = () => {
    if (selectedCategory === 'NEW ARRIVALS') {
      return allProducts.filter(product => product.isTopSeller);
    } else if (selectedCategory === 'BEST SELLERS') {
      return allProducts.filter(product => product.tag === 'BESTSELLER');
    } else if (selectedCategory === 'MAKEUP') {
      return allProducts.filter(product => product.category === 'makeup');
    } else if (selectedCategory === 'SHOES') {
      return allProducts.filter(product => product.category === 'shoes');
    } else if (selectedCategory === 'BAGS') {
      return allProducts.filter(product => product.category === 'bags');
    } else if (selectedCategory === 'DRESSES') {
      return allProducts.filter(product => product.category === 'dresses');
    } else if (selectedCategory === 'ACCESSORIES') {
      return allProducts.filter(product => product.category === 'accessories');
    }
    // SHOP ALL
    return allProducts;
  };

  const filteredProducts = getFilteredProducts();
  const filteredCurrentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const filteredTotalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <motion.div 
      className="shop-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="shop-header">
        <h1 className="shop-title">
          {selectedCategory === 'ALL' ? 'SHOP ALL' : selectedCategory}
        </h1>
        <p className="shop-subtitle">
          {selectedCategory === 'ALL' ? 'Discover our complete collection' : 
           `Browse our ${selectedCategory.toLowerCase()} collection`}
        </p>
      </div>


      {/* Products Grid */}
      <div className="products-grid shop-all-grid">
        {filteredCurrentProducts.length > 0 ? (
          filteredCurrentProducts.map(product => (
            <motion.div 
              key={`${product.category}-${product.id}`}
              className="product-card"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Category Badge */}
              <div className="category-badge">
                {product.categoryName || product.category}
              </div>

              {/* Product Image */}
              <div className="product-image-container">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/300x300/ffb3c6/ffffff?text=${product.name}`;
                  }}
                />
                
                {/* Badges */}
                {product.isTopSeller && (
                  <div className="top-seller-badge">
                    {product.topText || "Top Seller"}
                  </div>
                )}
                
                {product.discount && (
                  <div className="discount-badge-shop">
                    -{product.discount}
                  </div>
                )}

                <button 
  className="quick-add-btn"
  onClick={(e) => {
    e.stopPropagation();
    handleAddToCart(product);
  }}
>
  <i className="fas fa-shopping-bag"></i>
  ADD TO CART
</button>
              </div>

              {/* Product Info */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-pieces">{product.pieces || "1pc(s)"}</p>
                
                <div className="price-container">
                  {product.originalPrice ? (
                    <>
                      <span className="original-price">{product.originalPrice}</span>
                      <span className="current-price">{product.price}</span>
                    </>
                  ) : (
                    <span className="current-price">{product.price}</span>
                  )}
                </div>

              </div>
            </motion.div>
          ))
        ) : (
          <div className="no-products">
            <i className="fas fa-box-open"></i>
            <h3>No products found</h3>
            <p>Try selecting a different category</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <div className="pagination">
          <button 
            className="pagination-btn prev"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <i className="fas fa-chevron-left"></i> Previous
          </button>
          
          <div className="page-numbers">
            {getPageNumbers().map((number, index) => (
              number === '...' ? (
                <span key={`ellipsis-${index}`} className="page-ellipsis">...</span>
              ) : (
                <button
                  key={number}
                  className={`page-number ${currentPage === number ? 'active' : ''}`}
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              )
            ))}
          </div>
          
          <button 
            className="pagination-btn next"
            onClick={() => setCurrentPage(prev => Math.min(filteredTotalPages, prev + 1))}
            disabled={currentPage === filteredTotalPages}
          >
            Next <i className="fas fa-chevron-right"></i>
          </button>
          
        </div>
      )}
          <div className="page-info">
            Page {currentPage} of {filteredTotalPages} • 
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </div>
    </motion.div>
  );
};

export default ShopPage;