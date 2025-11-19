import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api';
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
            const response = await axios.get(`${API_BASE_URL}/api/orders`, { withCredentials: true });
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

    const getStatusIndex = (status) => {
        const stages = ['pending', 'preparing', 'on_the_way', 'delivered'];
        return stages.indexOf(status);
    };

    const getStatusIcon = (status) => {
        const iconMap = {
            pending: '📦',
            preparing: '👨‍🍳',
            on_the_way: '🚴',
            delivered: '✅'
        };
        return iconMap[status] || '❓';
    };

    if (loading) {
        return (
            <div className="order-history-container">
                <div className="order-history-header">
                    <h1 className="order-history-title">Order History</h1>
                    <p className="order-history-subtitle">Loading your orders...</p>
                </div>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="order-history-container">
            <div className="order-history-header">
                <h1 className="order-history-title">My Order History</h1>
                <p className="order-history-subtitle">Track your delicious food orders</p>
            </div>
            {orders.length === 0 ? (
                <div className="order-empty">
                    <div className="order-empty-icon">📦</div>
                    <h3>No orders yet</h3>
                    <p>You haven't placed any orders yet. Start exploring our menu!</p>
                    <Link to="/explore" className="btn btn-primary">Start Ordering</Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order._id} className="order-card">
                            <div className="order-header">
                                <h3>Order #{order._id.slice(-8)}</h3>
                                <span className={`status ${order.status}`}>{getStatusIcon(order.status)} {order.status}</span>
                            </div>
                            <div className="order-progress-mini">
                                <div className="progress-bars">
                                    {['pending', 'preparing', 'on_the_way', 'delivered'].map((stage, index) => (
                                        <div 
                                            key={stage} 
                                            className={`progress-bar ${index <= getStatusIndex(order.status) ? 'completed' : ''}`}
                                            title={stage}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                            <div className="order-summary">
                                <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                                <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p><strong>Items:</strong> {order.items.length}</p>
                            </div>
                            <Link to={`/orders/${order._id}`} className="view-details-btn">View Details</Link>
                        </div>
                    ))}
                </div>
            )}
            <div className="order-actions">
                <Link to="/explore" className="btn btn-outline">Continue Shopping</Link>
                <Link to="/" className="back-link">Back to Home</Link>
            </div>
            <BottomNav />
        </div>
    );
}

export default OrderHistory;