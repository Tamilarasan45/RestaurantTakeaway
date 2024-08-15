import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchSlots } from './API/api';
import Navbar from '../HomePage/Navbar';
import axios from 'axios';
import './css/SlotBookingPage.css';
var timeID="";
const SlotSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();

  
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const selectedFoods = location.state ? location.state.selectedItems : [];

    useEffect(() => {
        const fetchSlotsData = async () => {
            try {
                const response = await fetchSlots();
                const currentDayIndex = new Date().getDay();
                const currentDayName = getDayName(currentDayIndex);
                const currentDaySlots = response.find(slot => slot.day === currentDayName);
               
                if (currentDaySlots) {
                    timeID = currentDaySlots._id;
                   
                    const slotsArray = currentDaySlots.slots
                        .filter(slot => slot.total > 0) 
                        .map(slot => ({
                            time: slot.time,
                            slotId: slot._id,
                            total: slot.total
                        }));
                    setAvailableSlots(slotsArray);
                }
            } catch (error) {
                console.error('Error fetching slots data:', error);
            }
        };

        fetchSlotsData();
    }, []);

    const getDayName = (index) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[index];
    };

    
    const calculateTotal = () => {
        return selectedFoods.reduce((acc, item) => acc + item.foodPrice * item.quantity, 0).toFixed(2);
    };

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const confirmBooking = async () => {
        if (!selectedSlot) {
            alert('Please select a slot.');
            return;
        }

        const bookingData = {
            timingId:timeID,
            time: selectedSlot.time,
            newTotal:0
        };

        try {
            const response = await axios.post('http://localhost:2000/time/editTimingSlot', bookingData);
            if (response.status === 200) {
                alert(`You have successfully booked the following slot: ${selectedSlot.time}.\nYour booking details:\n${selectedFoods.map(food => `${food.quantity} x ${food.foodName} at $${food.foodPrice} each`).join('\n')}`);
                navigate('/');
            } else {
                alert('Failed to book slot. Please try again later.');
            }
        } catch (error) {
            console.error('Error posting booking:', error);
            alert(`Error while booking. Please try again later. ${error}`);
        }
    };

    if (!selectedFoods.length) {
        return <div>Please select at least one food item to book a slot.</div>;
    }

    return (
        <> <Navbar />
        <br></br>
          <div className="slot-booking-container">
      
      <h1>Order Summary</h1>
      <div>
          
          <ul>
              {selectedFoods.map(food => (
                  <li key={food._id}>
                      {food.quantity} x {food.foodName} - ${food.foodPrice} each
                  </li>
              ))}
          </ul>
          <h3>Total: ${calculateTotal()}</h3>
          <h2>Book your slot for pickup:</h2>
      </div>
      <div className="slots">
          {availableSlots.map((slot, index) => (
              <button key={index} onClick={() => handleSlotSelection(slot)} className={`slot-button ${selectedSlot === slot ? 'selected' : ''}`}>
                  {slot.time}
              </button>
          ))}
      </div>
      <button onClick={confirmBooking} disabled={!selectedSlot} className="confirm-booking-button">
          Confirm Booking
      </button>
  </div>
        </>
      
    );
};

export default SlotSelection;
