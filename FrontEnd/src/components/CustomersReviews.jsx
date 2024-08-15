import React from 'react';
import './CustomerReviews.css';

const CustomerReviews = () => {
    return (
        <div className="customer-reviews">
            <h2>Our Customer Reviews</h2>
            <div className="reviews">
                {}
                <div className="review">Review 1</div>
                <div className="review">Review 2</div>
                <div className="review">Review 3</div>
            </div>
        </div>
    );
};

export default CustomerReviews;
