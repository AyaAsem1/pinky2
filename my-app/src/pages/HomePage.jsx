// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/Hero';
import MustHaves from '../components/MustHaves';
import HotSpicy from '../components/HotSpicy';
import NewRelease from '../components/NewRelease';
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <MustHaves />
      <HotSpicy />
      <NewRelease />
      <Footer/>
    </div>
    
  );
};

export default HomePage;