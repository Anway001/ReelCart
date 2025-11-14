import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import BottomNav from './BottomNav';
import './OrderDetail.css';

function OrderDetail() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrderDetail();
    }, [orderId]);

    const fetchOrderDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`, { withCredentials: true });
            setOrder(response.data.order);
        } catch (error) {
            console.error('Error fetching order detail:', error);
            if (error.response?.status === 401) {
                navigate('/user/login');
            } else if (error.response?.status === 404) {
                alert('Order not found');
                navigate('/orders');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="order-detail-container">Loading order details...</div>;
    }

    if (!order) {
        return <div className="order-detail-container">Order not found.</div>;
    }

    return (
        <div className="order-detail-container">
            <h2>Order Details</h2>
            <div className="order-info">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> <span className={`status ${order.status}`}>{order.status}</span></p>
                <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                <p><strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="order-items">
                <h3>Items</h3>
                {order.items.map((item, index) => (
                    <div key={index} className="order-item-detail">
                        <div className="item-info">
                            <h4>{item.food.name}</h4>
                            <p>{item.food.discription}</p>
                        </div>
                        <div className="item-quantity-price">
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ₹{item.price.toFixed(2)} each</p>
                            <p>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="order-actions">
                <Link to="/orders" className="back-btn">Back to Order History</Link>
            </div>
            <BottomNav />
        </div>
    );
}

export default OrderDetail;