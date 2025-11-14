import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './BottomNav.css';

function BottomNav({ theme = 'light' }) {
    const { cart } = useCart();

    return (
        <nav className={`bottom-nav ${theme}`}>
            <Link to="/">Reels</Link>
            <Link to="/explore">Explore</Link>
            <Link to="/cart">Cart ({cart.length})</Link>
            <Link to="/orders">Orders</Link>
        </nav>
    );
}

export default BottomNav;