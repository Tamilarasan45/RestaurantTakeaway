import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSlots, updateSlots } from './API/api';
import Navbar from '../HomePage/Navbar';
import styles from './css/SlotsPage.module.css';

const SlotsPage = () => {
    const [slots, setSlots] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getSlots = async () => {
            try {
                const data = await fetchSlots();
                setSlots(data);
            } catch (error) {
                console.error('Error fetching slots:', error);
            }
        };

        getSlots();
    }, []);

    const handleEdit = (slot) => {
        navigate('/edit-slots', { state: { slot } });
    };

    return (
        <> 
        <Navbar />
        <br></br>
        <div className={styles.slotsContainer}>
        <h1 className={styles.slotsTitle}>Manage Slots</h1>
        <div className={styles.slotsList}>
            {slots.map(slot => (
                <div key={slot._id} className={styles.slotCard}>
                    <div className={styles.slotDetails}>
                        <div className={styles.slotInfo}><strong>Day:</strong> {slot.day}</div>
                        <div className={styles.slotInfo}><strong>Open Time:</strong> {slot.openTime}</div>
                        <div className={styles.slotInfo}><strong>Close Time:</strong> {slot.closeTime}</div>
                        <div className={styles.slotInfo}><strong>Threshold:</strong> {slot.threashold}</div>
                        <div className={styles.slotInfo}><strong>Fraction:</strong> {slot.fraction}</div>
                    </div>
                    <button onClick={() => handleEdit(slot)} className={styles.editButton}>
                        Edit
                    </button>
                </div>
            ))}
        </div>
    </div>
        </>
    
    
    );
};

export default SlotsPage;


