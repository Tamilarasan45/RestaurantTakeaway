import React from 'react';
import bannerImage from './Rectangle.png';

const Banner = () => {
  const bannerStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    height: '500px',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  };
  const header_style = {
    color: 'white',
    WebkitTextStroke: '1px black',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
    fontSize: '50px',
    fontFamily: 'serif'
};
  return (
    <div style={bannerStyle}>
      <h1 style={header_style}>No.1 Indian Restaurant in Dublin</h1>
    </div>
  );
};

export default Banner;
