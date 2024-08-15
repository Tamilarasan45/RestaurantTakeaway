import React ,{useState} from 'react';
import {  Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Login/AuthContext';
import ProtectedRoute from './components/Login/ProtectedRoute';
import AddFoodForm from './components/AddFoodForm';
import FoodList from './components/FoodList';
import EditFoodForm from './components/EditFoodForm';
import LoginPage from './components/Login/Login';
import RegistrationPage from './components/Login/RegistrationPage';
import FoodOrder from './components/FoodOrder';
import OrderHistoryPage from './components/OrderHistoryPage';
import SlotSelection from './components/SlotSelection';
import HomePage from './HomePage/HomePage';
import SlotsPage from './components/SlotPage';
import EditSlotsPage from './components/EditSlotPage';
import NotFound from './components/Notfound';

function App() {
  const [order, setOrder] = useState([]);

    const finalizeOrder = (items, slot) => {
        console.log('Final Order', items, 'for slot', slot);
        
    };
  return (
    <AuthProvider>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/food" element={
              <ProtectedRoute>
                <FoodList />
              </ProtectedRoute>
            } />
            <Route path="/order" element={
            <ProtectedRoute>
            <FoodOrder setOrder={setOrder} />
            </ProtectedRoute>
          }
             />
                <Route path="/book-slot" element={<SlotSelection selectedItems={order} finalizeOrder={finalizeOrder} />} />
          <Route path="/add-food" element={
              <ProtectedRoute>
                <AddFoodForm />
              </ProtectedRoute>
            } />
          <Route path="/edit-food/:id" element={
              <ProtectedRoute>
                <EditFoodForm />
              </ProtectedRoute>
            } />
                 <Route path="/slots" element={
             <ProtectedRoute>
              <SlotsPage />
             </ProtectedRoute>
           } />
           <Route path="/edit-slots" element={
            <ProtectedRoute>
           <EditSlotsPage />
           </ProtectedRoute>
           } />
      
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </AuthProvider>
  );
}

export default App;
