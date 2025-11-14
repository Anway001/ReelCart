import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../CartContext';
import BottomNav from './BottomNav';
import './Checkout.css';

function Checkout() {
    const { cart, clearCart, getTotalPrice } = useCart();
    const navigate = useNavigate();
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!deliveryAddress.trim()) {
            alert('Please enter delivery address');
            return;
        }

        setLoading(true);
        try {
            const items = cart.map(item => ({
                food: item._id,
                quantity: item.quantity,
                price: item.price
            }));

            const response = await axios.post('http://localhost:8080/api/orders', {
                items,
                deliveryAddress
            }, { withCredentials: true });

            alert('Order placed successfully!');
            clearCart();
            navigate('/orders'); // Assuming we'll have an orders page
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="checkout-container">
                <h2>Checkout</h2>
                <p>No items in cart.</p>
                <button onClick={() => navigate('/cart')}>Back to Cart</button>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <div className="checkout-summary">
                <h3>Order Summary</h3>
                {cart.map(item => (
                    <div key={item._id} className="checkout-item">
                        <span>{item.name} x {item.quantity}</span>
                        <span>₹{((item.price || 100) * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
                <div className="checkout-total">
                    <strong>Total: ₹{getTotalPrice().toFixed(2)}</strong>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label htmlFor="address">Delivery Address:</label>
                    <textarea
                        id="address"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        required
                        placeholder="Enter your delivery address"
                    />
                </div>
                <div className="form-group">
                    <label>Payment Method:</label>
                    <p>Cash on Delivery (COD)</p>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
            </form>
            <button onClick={() => navigate('/cart')} className="back-btn">Back to Cart</button>
            <BottomNav />
        </div>
    );
}

export default Checkout;