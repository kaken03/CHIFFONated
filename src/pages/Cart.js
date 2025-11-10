import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/common/Navbar';
import './Cart.css';

const Cart = () => {
    const history = useHistory();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return;
        updateQuantity(item.id, newQuantity);
    };

    const handleCheckout = () => {
        history.push('/checkout');
    };

    return (
        <div className="home-page">
            <Navbar />
            <div className="cart-page container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    {cart.length > 0 && (
                        <button className="btn btn-secondary" onClick={clearCart}>
                            Clear Cart
                        </button>
                    )}
                </div>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty</p>
                        <button 
                            className="btn btn-primary"
                            onClick={() => history.push('/products')}
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        <p className="item-price">${item.price}</p>
                                    </div>

                                    <div className="item-quantity">
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button 
                                            className="quantity-btn"
                                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="item-subtotal">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>

                                    <button 
                                        className="remove-btn"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal ({cart.length} items)</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="summary-total">
                                <span>Total</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <button 
                                className="btn btn-primary checkout-btn"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;