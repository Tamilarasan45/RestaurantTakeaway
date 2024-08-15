import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!localStorage.getItem('isLoggedIn')) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;