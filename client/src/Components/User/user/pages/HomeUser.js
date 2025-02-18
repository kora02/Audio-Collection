import React from 'react';
import Header from '../UserHeader'; // Import the Header component
import HeroSection from '../HeroSection';
import List1 from './List1';
import List2 from './List2';
import Footer from './Footer';


const HomeUser = () => {
  return (
    <div className='main-container'>
      <Header /> {/* Include the Header component */}
      <HeroSection />
      <List1 />
      <List2 />
      <Footer />
    </div>
  );
};

export default HomeUser;
