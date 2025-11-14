import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import BottomNav from './BottomNav';
import './Cart.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <h2>Your Cart</h2>
                <p>Your cart is empty.</p>
                <Link to="/">Continue Shopping</Link>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <div key={item._id} className="cart-item">
                        <div className="item-info">
                            <h3>{item.name}</h3>
                            <p>{item.discription}</p>
                            <p>Price: ${(item.price || 100).toFixed(2)}</p>
                        </div>
                        <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                    </div>
                ))}
            </div>
            <div className="cart-total">
                <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            </div>
            <div className="cart-actions">
                <Link to="/">Continue Shopping</Link>
                <Link to="/checkout">Proceed to Checkout</Link>
            </div>
            <BottomNav />
        </div>
    );
}

export default Cart;