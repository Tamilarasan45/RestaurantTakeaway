import React, { useState } from 'react';
import Footer from '../HomePage/Footer';
import Navbar from '../HomePage/Navbar';
import './css/OrderHistoryPage.css';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);

 
    return (
        <div>
            <Navbar/>
        <div className="order-history-container">
            <h1>Order History</h1>
            {orders.length > 0 ? (
                <ul className="order-list">
                    {orders.map(order => (
                        <li key={order.id} className="order-item">
                            <div>Date: {new Date(order.date).toLocaleDateString()}</div>
                            <div>Total: ${order.total.toFixed(2)}</div>
                            <div>Status: {order.status}</div>
                            <ul className="food-list">
                                {order.foods.map(food => (
                                    <li key={food.id}>
                                        {food.name} - {food.quantity} x ${food.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
        <Footer/>
        </div>
    );
};

export default OrderHistoryPage;
