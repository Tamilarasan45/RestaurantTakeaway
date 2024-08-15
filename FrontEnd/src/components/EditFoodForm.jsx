import React, { useState, useEffect } from 'react';
import { updateFood } from './API/api';
import './css/Editfood.css'
function EditFoodForm({ food, closeModal, handleUpdateFood }) {
    const [formData, setFormData] = useState({
        _id: '',
        foodName: '',
        foodType: '',
        foodDesc: '',
        foodPrice: '',
        foodAllergiens: '',
        foodStatus: '',
    });

    useEffect(() => {
      if (food) {
          setFormData({
              _id: food._id,
              foodName: food.foodName,
              foodType: food.foodType,
              foodDesc: food.foodDesc,
              foodPrice: food.foodPrice,
              foodAllergiens: food.foodAllergiens, 
              foodStatus: food.foodStatus,
          });
      }
  }, [food]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          
          const formattedData = {
              ...formData,
              foodAllergiens: Array.isArray(formData.foodAllergiens)
                  ? formData.foodAllergiens.join(', ') 
                  : formData.foodAllergiens,
          };
          
      
          const updatedFood = await updateFood(formattedData);
          handleUpdateFood(updatedFood); 
          closeModal();
      } catch (error) {
          console.error('Error updating food item:', error);
      }
  };

    return (
      <div className="form-container" style={{ height: 'auto', overflowY: 'auto', padding: '20px'
    }}>
         <form onSubmit={handleSubmit} style={{ margin: 'auto' }}>
      <fieldset>
        <legend>Food Details</legend>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Food Name:
            <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} required style={{width: '100%'}} />
          </label>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Food Type:
            <input type="text" name="foodType" value={formData.foodType} onChange={handleChange} required style={{width: '100%'}} />
          </label>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Description:
            <textarea name="foodDesc" value={formData.foodDesc} onChange={handleChange} required style={{width: '100%', height: '100px'}} />
          </label>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Price:
            <input type="number" name="foodPrice" value={formData.foodPrice} onChange={handleChange} required style={{width: '100%'}} />
          </label>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Allergens:
            <input type="text" name="foodAllergens" value={formData.foodAllergens} onChange={handleChange} style={{width: '100%'}} />
          </label>
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{display: 'block', marginBottom: '5px'}}>Status:
            <select name="foodStatus" value={formData.foodStatus} onChange={handleChange} required style={{width: '100%'}}>
              <option value="">Select a status</option>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </label>
        </div>
      </fieldset>
      <div style={{textAlign: 'right', marginTop: '20px'}}>
        <button type="submit" style={{marginRight: '10px'}}>Save</button>
        <button type="button" onClick={closeModal} style={{background: '#ccc'}}>Cancel</button>
      </div>
    </form>
    </div>
        );
}

export default EditFoodForm;
