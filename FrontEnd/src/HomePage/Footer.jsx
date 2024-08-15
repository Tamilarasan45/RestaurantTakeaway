import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import footerImage from './logo.png';
const Footer = () => {

  const footerMain = {
    color: 'white',
    background: '#333',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    fontFamily: 'serif',
  };

  const footerColumn = {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',
    minWidth: '180px',
    maxWidth: '300px',
    fontFamily: 'serif',
  };

  const footerTitle = {
    fontSize: '1.5em',
    marginBottom: '10px',
    fontFamily: 'serif',
  };

  const socialIcon = {
    fontSize: '1em',
    padding: '5px',
    display: 'flex',
    marginBottom: '10px',
  };
  const footerImageStyle = {
    height: 'auto',
    maxWidth: '40%',
  };
  return (
    <footer id={'footer'} style={footerMain}>
      <div style={footerColumn}>
        <h2 style={footerTitle}>Contact us</h2>
        <p>1 Crossings, Adamstown, Co.Dublin K73 R4518</p>
        <p>+353 987654321</p>
        <p>grabandgotakeaway@gmail.com</p>
      </div>
      <div style={footerColumn}>
        <h2 style={footerTitle}>Opening Hours</h2>
        <p>Monday - Wednesday: 11 AM to 6 PM.</p>
        <p>Thursday & Friday: 10 AM to 8 PM.</p>
        <p>Saturday & Sunday: 10 AM to 12 PM.</p>
      </div>
      <div style={footerColumn}>
        <h2 style={footerTitle}>Stay Connected</h2>
        <p>Follow us on social media channels</p>
        <div style={socialIcon}>
          <p><i className="bi bi-instagram"></i> GrabAndGo </p>
        </div>
        <img src={footerImage} alt="Restaurant Logo" style={footerImageStyle} />
      </div>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <p>&copy; 2024 Grab&Go. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
