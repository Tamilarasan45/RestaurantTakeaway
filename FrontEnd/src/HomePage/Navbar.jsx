import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Login/AuthContext';
import './css/Navbar.css';
const Navbar = () => {
    const { isAuthenticated, role, logout } = useAuth();
    const navigate = useNavigate();
    const [isNavExpanded, setIsNavExpanded] = React.useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setIsNavExpanded(false);
    };

    const handleLogout = () => {
        logout();
        handleNavigate('/login');
    };

    const redirectFooter=()=>{
        const footer=document.getElementById('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <nav className="navbar">
            <div className="nav-logo" onClick={() => handleNavigate('/')}>Grab & GO</div>
            <button className="nav-toggle" onClick={() => setIsNavExpanded(!isNavExpanded)}>
                Menu
            </button>
            <ul className={`nav-links ${isNavExpanded ? 'expanded' : ''}`}>
                {isAuthenticated && role === '1' ? (
                    <>
                        <li className="nav-item" onClick={() => handleNavigate('/add-food')}>Add food</li>
                        <li className="nav-item" onClick={() => handleNavigate('/food')}>Edit Menu</li>
                        <li className="nav-item" onClick={() => handleNavigate('/slots')}>Edit Slots</li>
                        <li className="nav-item" onClick={handleLogout}>Logout</li>
                    </>
                ) : isAuthenticated && role === '2' ? (
                    <>
                        <li className="nav-item" onClick={() => handleNavigate('/order')}>Menu</li>
                        <li className="nav-item" onClick={redirectFooter}>Contact Us</li>
                        <li className="nav-item" onClick={handleLogout}>Logout</li>
                    </>
                ) : (
                    <>
                        <li className="nav-item" onClick={() => handleNavigate('/food')}>Menu</li>
                        <li className="nav-item" onClick={redirectFooter}>Contact Us</li>
                        <li className="nav-item" onClick={() => handleNavigate('/login')}>Login/Register</li>
                    </>
                )}
            </ul>
        </nav>
    );
    
};

export default Navbar;