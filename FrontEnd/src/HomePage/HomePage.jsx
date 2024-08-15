import React from 'react';
import Banner from './Banner';
import CustomerReviews from './CustomerReviews';
import Footer from './Footer';
import Navbar from './Navbar';
import TopSellers from './TopSellers';
function HomePage() {
  return (
    <div>
      <Navbar />
      <Banner />
      <TopSellers />
      <CustomerReviews />
      <Footer />
    </div>
  );
}

export default HomePage;
