import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../API/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        isAuthenticated: false,
        role: 'anonymous'
    });
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const role = localStorage.getItem('role') || 'anonymous';
        setUser({ isAuthenticated: isLoggedIn, role });
    }, []);

    const login = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            if (data.token) {
                const userType = data.user_type;
                let role;
                switch(userType) {
                    case '1':
                        role = '1';
                        break;
                    case '2':
                        role = '2';
                        break;
                    default:
                        role = '3';
                        break;
                }

                setUser({ isAuthenticated: true, role: role });
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', role);
                navigate('/');
            } else {
                throw new Error('Authentication failed');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setUser({ isAuthenticated: false, role: 'anonymous' });
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('role');
            navigate('/login');
            throw error;
        }
    };

    const logout = () => {
        setUser({ isAuthenticated: false, role: 'anonymous' });
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ ...user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};