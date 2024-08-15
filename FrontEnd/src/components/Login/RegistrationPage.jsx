import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css' 
import logoImage from './logo.png';


const RegistrationPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobilenum:''
    });
    const navigate= useNavigate();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid()) {
            console.error('Form validation failed');
            return;
        }

        try {
            
            const response = await axios.post('http://localhost:2000/user/addUser', userData);
            console.log('Registration successful:', response.data);
            alert('Registration successful');
            navigate("/login")
           
        } catch (error) {
            console.error('Registration failed:', error);
            
        }
    };

    const isFormValid = () => {
        const errors = {};
        if (!userData.username) errors.username = 'Username is required';
        if (!userData.email) errors.email = 'Email is required';
        if (!userData.password) errors.password = 'Password is required';
        if (userData.password !== userData.confirmPassword) errors.confirmPassword = 'Passwords do not match';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    return (
        <div className="app-wrapper">
        <div className="logo-container">
        <img src={logoImage} alt="Logo" className="logo-image" />
            <p className="restaurant-info">
                Welcome to Grab & Go! <br />We offer a wide variety of delicious dishes for you to enjoy.
            </p>
        </div>
        <div className="registration-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={userData.username} onChange={handleChange} />
                    {errors.username && <span className="error">Required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} />
                    {errors.email && <span className="error">Required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="mobilenum">Contact:</label>
                    <input type="text" id="mobilenum" name="mobilenum" value={userData.mobilenum} onChange={handleChange} />
                    {errors.mobilenum && <span className="error">Required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} />
                    {errors.password && <span className="error">Required</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
                    {errors.confirmPassword && <span className="error">Required</span>}
                    <p className="password-message">Password MUST contain at least 8 characters (one upper case letter, one lower case letter, one number & one special character)</p>
                    {userData.passwordMismatch && <p className="error">Passwords do not match!</p>}
                </div>
                <div className="form-group">
                    <button type="submit">Create Account</button>
                </div>
                <div className="signin-link">
                    <p>Already have an account? <a href="/login">Sign in</a></p>
                </div>
            </form>
        </div>
    </div>
    
      );
    
};

export default RegistrationPage;
