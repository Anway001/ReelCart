import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import axios from 'axios';
import './BottomNav.css';

function BottomNav({ theme = 'light' }) {
    const { cart } = useCart();
    const [userType, setUserType] = useState(null); // 'user', 'foodpartner', or null

    useEffect(() => {
        checkUserType();
    }, []);

    const checkUserType = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/me', {
                withCredentials: true
            });
            setUserType(response.data?.type || null);
        } catch (error) {
            // User not authenticated
            setUserType(null);
        }
    };

    const isFoodPartner = userType === 'foodpartner';

    return (
        <nav className={`bottom-nav ${theme}`}>
            <Link to="/">Reels</Link>
            <Link to="/explore">Explore</Link>
            {isFoodPartner ? (
                <Link to="/partner/dashboard">Dashboard</Link>
            ) : (
                <>
                    <Link to="/cart">Cart ({cart.length})</Link>
                    <Link to="/orders">Orders</Link>
                </>
            )}
        </nav>
    );
}

export default BottomNav;