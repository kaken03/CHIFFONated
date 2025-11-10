import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const history = useHistory();

    const handleCheckout = async () => {
        if (!user) {
            alert('Please log in to place an order.');
            return;
        }

        const orderData = {
            userId: user.uid,
            items: cartItems,
            createdAt: new Date(),
            status: 'Pending',
        };

        try {
            await db.collection('orders').add(orderData);
            clearCart();
            history.push('/orders');
        } catch (error) {
            console.error('Error placing order: ', error);
        }
    };

    return (
        <div>
            <h1>Checkout</h1>
            <h2>Your Cart Items:</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleCheckout}>Place Order</button>
        </div>
    );
};

export default Checkout;