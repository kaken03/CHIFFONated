import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/common/Navbar';
import './Orders.css';

const Orders = () => {
    const history = useHistory();
    const { user } = useAuth();

    // TODO: Replace with real data from Firestore
    const orders = [
        {
            id: "ORD001",
            date: "2023-11-10",
            status: 'delivered',
            items: [
                { name: 'Chocolate Cake', quantity: 1, price: 25.00 },
                { name: 'Vanilla Cupcake', quantity: 2, price: 5.00 }
            ],
            total: 35.00,
            delivery: {
                address: "123 Baker Street",
                date: "2023-11-15",
                time: "14:00-16:00"
            }
        },
        {
            id: "ORD002",
            date: "2023-11-09",
            status: 'pending',
            items: [
                { name: 'Red Velvet Cake', quantity: 1, price: 30.00 }
            ],
            total: 30.00,
            delivery: {
                address: "456 Main St",
                date: "2023-11-20",
                time: "10:00-12:00"
            }
        }
    ];

    const getStatusColor = (status) => {
        const colors = {
            'pending': '#f59e0b',
            'confirmed': '#3b82f6',
            'preparing': '#8b5cf6',
            'delivered': '#10b981',
            'cancelled': '#ef4444'
        };
        return colors[status] || '#6b7280';
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (!user) {
        return (
            <div className="home-page">
                <Navbar />
                <div className="orders-page container">
                    <div className="auth-prompt">
                        <h2>Please sign in to view your orders</h2>
                        <button 
                            className="btn btn-primary"
                            onClick={() => history.push('/profile')}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="home-page">
            <Navbar />
            <div className="orders-page container">
                <div className="orders-header">
                    <h1>Your Orders</h1>
                    <button 
                        className="btn btn-primary"
                        onClick={() => history.push('/products')}
                    >
                        Order More
                    </button>
                </div>

                {orders.length === 0 ? (
                    <div className="no-orders">
                        <p>You haven't placed any orders yet.</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => history.push('/products')}
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map(order => (
                            <div key={order.id} className="order-card">
                                <div className="order-header">
                                    <div>
                                        <h2>Order #{order.id}</h2>
                                        <p className="order-date">
                                            Placed on {formatDate(order.date)}
                                        </p>
                                    </div>
                                    <div 
                                        className="order-status"
                                        style={{ backgroundColor: getStatusColor(order.status) }}
                                    >
                                        {order.status}
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items.map((item, index) => (
                                        <div key={index} className="order-item">
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-quantity">×{item.quantity}</span>
                                            <span className="item-price">${item.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="order-delivery">
                                    <h3>Delivery Details</h3>
                                    <p>{order.delivery.address}</p>
                                    <p>
                                        {formatDate(order.delivery.date)}, {order.delivery.time}
                                    </p>
                                </div>

                                <div className="order-footer">
                                    <div className="order-total">
                                        <span>Total</span>
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                    <button className="btn btn-secondary">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;