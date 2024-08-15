import React from 'react';
import topSeller3 from './biriyani.png';
import topSeller1 from './tandoori.png';
import topSeller2 from './tikka.png';

const TopSellers = () => {
  const topSellersStyle = {
    fontFamily: 'serif',
    fontSize: '25px',
    color: 'black',
    textAlign:'center'
  };
  
  const sellersListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    padding: '1rem',
    maxWidth: '1300px',
    margin: '0 auto',
  };
  
  const sellerItemStyle = {
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
  };
  
  const sellerItemImageStyle = {
    width: '100%',
    display: 'block',
  };
  
  const sellerItemTitleStyle = {
    textAlign: 'center',
    padding: '1rem',
    color:'Black',
    fontFamily: 'serif',
  };
  
  return (
    <div style={topSellersStyle}>
      <h2>High Rated Dishes</h2>
      <div style={sellersListStyle}>
        <div style={sellerItemStyle}>
          <img src={topSeller1} alt="Top Seller 1" style={sellerItemImageStyle} />
          <div style={sellerItemTitleStyle}>Chicken Tandoori</div>
        </div>
        <div style={sellerItemStyle}>
          <img src={topSeller2} alt="Top Seller 2" style={sellerItemImageStyle} />
          <div style={sellerItemTitleStyle}>Panneer Tikka</div>
        </div>
        <div style={sellerItemStyle}>
          <img src={topSeller3} alt="Top Seller 3" style={sellerItemImageStyle} />
          <div style={sellerItemTitleStyle}>Chicken Biriyani</div>
        </div>
        {}
      </div>
    </div>
  );
}

export default TopSellers;
