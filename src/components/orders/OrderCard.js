import React from 'react';

const OrderCard = ({ order }) => {
    return (
        <div className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p>Status: {order.status}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            <h4>Items:</h4>
            <ul>
                {order.items.map(item => (
                    <li key={item.id}>
                        {item.name} - ${item.price} x {item.quantity}
                    </li>
                ))}
            </ul>
            <p>Total: ${order.total}</p>
        </div>
    );
};

export default OrderCard;