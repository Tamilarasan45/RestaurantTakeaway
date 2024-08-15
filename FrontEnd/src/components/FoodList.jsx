    import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Navbar from '../HomePage/Navbar';
import { fetchFoods as fetchFoodsApi } from './API/api';
import EditFoodForm from './EditFoodForm';
import styles from './css/FoodListAdmin.module.css';
    function FoodList() {
      const [foods, setFoods] = useState([]);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [currentFood, setCurrentFood] = useState(null);

      useEffect(() => {
        const fetchFoods = async () => {
          try {
            const data = await fetchFoodsApi();
            setFoods(data);
          } catch (error) {
            console.error('Error fetching food items', error);
          }
        };
    
        fetchFoods();
      }, []);

      const handleEditClick = (food) => {
        setCurrentFood(food);
        setIsModalOpen(true);
      };
    
      const handleUpdateFood = (updatedFood) => {
        setFoods(currentFoods =>
          currentFoods.map(food => food._id === updatedFood._id ? updatedFood : food)
        );
        closeModal();
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
        setCurrentFood(null);
      };
    
      return (
        <>      <Navbar /> 
        <br />       
        <div className={styles.foodListContainer}>
        <h2 className={styles.foodListTitle}>Food Items</h2>
        <ul className={styles.foodList}>
    {foods.map((food) => (
      <li key={food._id} className={styles.foodItem}>
        <div className={styles.foodDetails}>
          <span className={styles.foodLabel}>Name: {food.foodName}</span>
          <span className={styles.foodLabel}>Type: {food.foodType}</span>
          <span className={styles.foodLabel}>Price: ${food.foodPrice}</span>
        </div>
        <div className={styles.foodDetails}>
          <span className={styles.foodLabel}>Description: {food.foodDesc}</span>
        </div>
        <button className={styles.editButton} onClick={() => handleEditClick(food)}>
          <FontAwesomeIcon icon={faEdit} /> Edit
        </button>
      </li>
    ))}
  </ul>
        {isModalOpen && (
<div className={styles.modalOverlay}>

    <EditFoodForm
      food={currentFood}
      handleUpdateFood={handleUpdateFood}
      closeModal={closeModal} 
    />

</div>
)}
      </div></>      );
    }
    
    export default FoodList;
    
