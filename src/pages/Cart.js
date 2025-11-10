const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

    const handleRemove = (itemId) => {
        removeFromCart(itemId);
    };

    const handleCheckout = () => {
        // Logic for proceeding to checkout
    };

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={item.id}>
                                <h2>{item.name}</h2>
                                <p>Price: ${item.price}</p>
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={clearCart}>Clear Cart</button>
                    <button onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            )}
        </div>
    );
};

export default Cart;