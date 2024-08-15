import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../HomePage/Footer';
import Navbar from '../HomePage/Navbar';
import { fetchFoods as fetchFoodsApi } from './API/api';
import styles from './css/FoodList.module.css';

function FoodOrder() {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetchFoodsApi();
                const publishedFoods = response.filter(food => food.foodStatus === 'Published');
                setFoods(publishedFoods.map(food => ({ ...food, quantity: 0 })));
            } catch (error) {
                console.error('Error fetching food items', error);
            }
        };
        fetchFoods();
    }, []);


    const handleAddToCart = (food) => {
        const exists = cart.find(item => item._id === food._id);
        if (exists) {
            setCart(cart.map(item => 
                item._id === food._id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            setCart([...cart, { ...food, quantity: 1 }]);
        }
    };

    const handleRemoveFromCart = (id) => {
        const exists = cart.find(item => item._id === id);
        if (exists.quantity > 1) {
            setCart(cart.map(item => 
                item._id === id ? { ...item, quantity: item.quantity - 1 } : item
            ));
        } else {
            setCart(cart.filter(item => item._id !== id));
        }
    };

    const handleProceedToBooking = () => {
        if (cart.length > 0) {
            navigate('/book-slot', { state: { selectedItems: cart } });
        } else {
            alert('Please add at least one item to proceed.');
        }
    };

    return (<>
    <Navbar />
        <div className={styles.foodListContainer}>
            <br></br>

            <h2 className={styles.foodListTitle}>Menu</h2>
            <ul className={styles.foodList}>
            {foods.map((food) => (
    <li key={food._id} className={styles.foodItem}>
        <div className={styles.foodDetails}>
            <span className={styles.foodLabel}>{food.foodType} - {food.foodName}</span>
            <div className={styles.foodField}>
                <button className={styles.greenButton}>€{food.foodPrice}</button>
            </div>
            <div className={styles.AddMinControls}>
                <button onClick={() => handleRemoveFromCart(food._id)} disabled={!(cart.find(item => item._id === food._id)?.quantity > 0)}>-</button>
                <span> {cart.find(item => item._id === food._id)?.quantity || 0} </span>
                <button onClick={() => handleAddToCart(food)}>+</button>
            </div>
        </div>
    </li>
))}

            </ul>
            <button onClick={handleProceedToBooking} disabled={cart.length === 0}>Proceed to Booking</button>
        </div>
  <Footer/>
    </>
      

    );
}

export default FoodOrder;
