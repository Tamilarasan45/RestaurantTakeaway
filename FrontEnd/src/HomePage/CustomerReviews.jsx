import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useRef, useState } from 'react';
const CustomerReviews = () => {
  const scrollRef = useRef(null);
  const [containerOffset, setContainerOffset] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild.offsetWidth;
      const gap = parseInt(window.getComputedStyle(scrollRef.current.firstChild).marginRight) * 2;
      const containerWidth = scrollRef.current.offsetWidth;
      const totalVisibleWidth = (cardWidth + gap) * 3 - gap;
      const offset = (containerWidth - totalVisibleWidth) / 2;
      setContainerOffset(offset > 0 ? offset : 0);
    }
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollRef.current.firstChild.offsetWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollRef.current.firstChild.offsetWidth, behavior: 'smooth' });
  };

  const reviewsStyle = {
    position: 'relative',
    textAlign: 'center',
    padding: '20px',
    background: 'white',
  };

  const reviewCardStyle = {
    flex: '0 0 auto',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
    margin: '0 10px',
    minWidth: '250px',
    background: '#fff',
    boxShadow: '0 5px 5px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s ease-in-out',
  };

  const scrollButtonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    fontSize: '3rem',
    cursor: 'pointer',
    zIndex: 10, 
    color: '#333',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
  };

  const leftButtonStyle = {
    left: '200px'
  };

  const rightButtonStyle = {
    right: '200px'
  };

  const reviewCardsContainerStyle = {
    display: 'flex',
    overflow: 'hidden',
    scrollBehavior: 'smooth',
    fontFamily: 'serif',
    marginLeft: `${containerOffset}px`,
    marginRight: `${containerOffset}px`,
  };

    const reviews = [
    { text: "The food was absolutely amazing!", name: "John Doe", rating: "★★★★★" },
    { text: "I loved the atmosphere and the service was great!", name: "Jane Smith", rating: "★★★★☆" },
    { text: "A delightful experience, I can't wait to come back.", name: "Emily Johnson", rating: "★★★★★" },
    { text: "Truly scrumptious! A feast for the senses.", name: "Michael Brown", rating: "★★★★★" },
    { text: "Good service, but the food was just okay.", name: "Alex Lee", rating: "★★★☆☆" },
  ];
  
  const reviewRatingStyle = {
    color: 'yellow',
    fontWeight: 'bold',
  };

  const buttonVisibilityStyle = {
    opacity: hover ? 1 : 0.7,
    transition: 'opacity 0.3s ease-in-out',
  };
  const reviewhead={
    fontFamily: 'serif',
  }
  return (
    <div
      style={reviewsStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h2 style={reviewhead}>Our Customer Reviews</h2>
      <button
        style={{ ...scrollButtonStyle, ...leftButtonStyle, ...buttonVisibilityStyle }}
        onClick={scrollLeft}
        aria-label="Scroll Left"
      >
      <i className="bi bi-chevron-double-left"></i>
      </button>
      <div style={reviewCardsContainerStyle} ref={scrollRef}>
        {reviews.map((review, index) => (
          <div key={index} style={reviewCardStyle}>
            <p>"{review.text}"</p>
            <p>- {review.name}</p>
            <p style={reviewRatingStyle}>{review.rating}</p>
          </div>
        ))}
      </div>
      <button
        style={{ ...scrollButtonStyle, ...rightButtonStyle, ...buttonVisibilityStyle }}
        onClick={scrollRight}
        aria-label="Scroll Right"
      >
      <i className="bi bi-chevron-double-right"></i>
      </button>
    </div>
  );
};

export default CustomerReviews;
