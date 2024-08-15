import axios from 'axios';

// Base configuration for Axios
const API = axios.create({
    baseURL: 'http://localhost:2000/', 
    headers: {
        'Content-Type': 'application/json'
    }
});


export const fetchFoods = async () => {
    try {
        const response = await API.get('food/listAll');
        return response.data; 
    } catch (error) {
        console.error("Failed to fetch foods:", error);
        throw error; 
    }
};


export const addFood = async (foodData) => {
    try {
        const response = await API.post('food/addFood', foodData);
        return response.data;
    } catch (error) {
        console.error("Failed to add food:", error);
        throw error;
    }
};


export const updateFood = async (foodData) => {
    try {
        const response = await API.post(`food/editFood`, foodData);
        return response.data;
    } catch (error) {
        console.error("Failed to update food:", error);
        throw error;
    }
};



export const deleteFood = async (foodId) => {
    try {
        const response = await API.delete(`food/delete/${foodId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to delete food:", error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await API.post('user/login', { email, password });
        return response.data; 
    } catch (error) {
        console.error("API call failed:", error);
        throw error; 
    }
};
export const updateSlots = async (slotsData) => {
    try {
        const response = await API.post('time/edittiming', slotsData);
        return response.data; // Assuming the API returns the updated data or some confirmation message
    } catch (error) {
        console.error("Failed to update slots:", error);
        throw error; 
    }
};

export const addSlots = async (slotsData) => {
    try {
        const response = await API.post(`time/add`, slotsData);
        return response.data; 
    } catch (error) {
        console.error("Failed to update slots:", error);
        throw error; 
    }
};

export const fetchSlots = async () => {
    try {
        
        const response = await API.get(`time/getAll`);
        return response.data; 
    } catch (error) {
        console.error("Failed to fetch slots:", error);
        throw error; 
    }
};