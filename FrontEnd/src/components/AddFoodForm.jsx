import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../HomePage/Navbar';
import './css/AddFoodForm.module.css';
import { addFood } from './API/api'; 
const AddFoodForm = () => {
    const navigate = useNavigate();
    const [foodName, setFoodName] = useState('');
    const [foodType, setFoodType] = useState('');
    const [foodDesc, setFoodDesc] = useState('');
    const [foodPrice, setFoodPrice] = useState(0);
    const [foodAllergens, setFoodAllergens] = useState([]);
    const [foodStatus, setFoodStatus] = useState('');

    const allergenOptions = ['Peanuts', 'Tree nuts', 'Milk', 'Egg', 'Wheat', 'Soy', 'Fish', 'Shellfish'];
    const allergensString = foodAllergens.join(', ');
    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const foodData = {
            foodName, 
            foodType, 
            foodDesc, 
            foodPrice: Number(foodPrice), 
            foodAllergiens: allergensString,
            foodStatus
        };

        try {
            await addFood(foodData);
            alert('Food added successfully!');
            navigate('/food');
            setFoodName('');
            setFoodType('');
            setFoodDesc('');
            setFoodPrice(0);
            setFoodAllergens([]);
            setFoodStatus('');
        } catch (error) {
            console.error("Error adding food", error);
            alert('Failed to add food.');
        }
    };
    const handleAllergenChange = (event) => {
        const values = Array.from(event.target.selectedOptions, option => option.value);
        setFoodAllergens(values);
    };
    const setStatusAndSubmit = (status) => {
        setFoodStatus(status);
        handleSubmit(new Event('submit'));
    };

    return (
        <>
        <Navbar />
        <br></br>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
            <h2 style={{ textAlign: 'center' }}>Add New Food Item</h2>
            <div className="form-group">
                <label htmlFor="foodName">Food Name:</label>
                <input id="foodName" type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="foodType">Food Type:</label>
                <input id="foodType" type="text" value={foodType} onChange={(e) => setFoodType(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="foodDesc">Description:</label>
                <input id="foodDesc" type="text" value={foodDesc} onChange={(e) => setFoodDesc(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="foodPrice">Price:</label>
                <input id="foodPrice" type="number" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="foodAllergens">Allergens:</label>
                <select multiple value={foodAllergens} onChange={handleAllergenChange}>
                    {allergenOptions.map(allergen => (
                        <option key={allergen} value={allergen}>{allergen}</option>
                    ))}
                </select>
            </div>

            <button type="button" onClick={() => setStatusAndSubmit('Draft')} style={{ width: '100%', padding: '10px', backgroundColor: 'gray', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Save as Draft
            </button>
            <button type="button" onClick={() => setStatusAndSubmit('Published')} style={{ width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Publish
            </button>
        </form>
    </div></>
        
    );
};
export default AddFoodForm;