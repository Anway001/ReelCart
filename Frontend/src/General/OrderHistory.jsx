import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BottomNav from './BottomNav';
import './OrderHistory.css';

function OrderHistory() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/orders', { withCredentials: true });
            setOrders(response.data.orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            if (error.response?.status === 401) {
                navigate('/user/login');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="order-history-container">Loading orders...</div>;
    }

    return (
        <div className="order-history-container">
            <h2>My Order History</h2>
            {orders.length === 0 ? (
                <p>You haven't placed any orders yet.</p>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order._id.slice(-8)}</h3>
                                <span className={`status ${order.status}`}>{order.status}</span>
                            </div>
                            <div className="order-summary">
                                <p><strong>Total:</strong> ${order.totalAmount.toFixed(2)}</p>
                                <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p><strong>Items:</strong> {order.items.length}</p>
                            </div>
                            <Link to={`/orders/${order._id}`} className="view-details-btn">View Details</Link>
                        </div>
                    ))}
                </div>
            )}
            <Link to="/" className="back-link">Back to Home</Link>
            <BottomNav />
        </div>
    );
}

export default OrderHistory;