import React, { useState } from 'react';
import { useLocation, useNavigate    } from 'react-router-dom';
import axios from 'axios';
import styles from './css/EditSlotPage.module.css'; 
import { updateSlots } from './API/api';
import Navbar from '../HomePage/Navbar';
const EditSlotsPage = () => {
    const navigate = useNavigate();
  

    const location = useLocation();
    const [slots, setSlots] = useState(location.state.slot || {
        day: 'Monday',
        isAvailable: true,
        openTime: '09:00',
        closeTime: '17:00',
        threshold: 10,
        fraction: 15
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSlots(prevSlots => ({
            ...prevSlots,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSlots(slots);
            alert('Slot updated successfully!');
            navigate('/slots');
        } catch (error) {
            console.error('Error updating slot:', error);
            alert('Failed to update slot.');
        }
    };

    return (
        <><Navbar />
        <br></br>
         <div className={styles.container}>
        <h1>Edit Opening and Closing Times</h1>
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="openTime" className={styles.label}>Open Time:</label>
                <input
                    type="time"
                    id="openTime"
                    name="openTime"
                    value={slots.openTime}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="closeTime" className={styles.label}>Close Time:</label>
                <input
                    type="time"
                    id="closeTime"
                    name="closeTime"
                    value={slots.closeTime}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
  <label htmlFor="day" className={styles.label}>Day:</label>
  <select 
    id="day" 
    name="day" 
    value={slots.day} 
    onChange={handleChange} 
    className={styles.input}
  >
    <option value="">Select a day</option>
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
    <option value="Wednesday">Wednesday</option>
    <option value="Thursday">Thursday</option>
    <option value="Friday">Friday</option>
    <option value="Saturday">Saturday</option>
    <option value="Sunday">Sunday</option>
  </select>
</div>

            <div className={styles.formGroup}>
                <label htmlFor="threashold" className={styles.label}>Threashold</label>
                <input
                    type="number"
                    id="threashold"
                    name="threashold"
                    value={slots.threashold}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="fraction" className={styles.label}>fraction</label>
                <input
                    type="number"
                    id="fraction"
                    name="fraction"
                    value={slots.fraction}
                    onChange={handleChange}
                    className={styles.input}
                />
            </div>
            <button type="submit" className={styles.button}>Save Times</button>
        </form>
    </div>

        </>
               );
};

export default EditSlotsPage;
