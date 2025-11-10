export default function Orders() {
    // Sample data for orders
    const orders = [
        { id: 1, status: 'Delivered', items: ['Chocolate Cake', 'Vanilla Cupcake'], total: 25.00 },
        { id: 2, status: 'Pending', items: ['Red Velvet Cake'], total: 30.00 },
        { id: 3, status: 'Cancelled', items: ['Lemon Tart'], total: 15.00 },
    ];

    return (
        <div>
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            <h2>Order ID: {order.id}</h2>
                            <p>Status: {order.status}</p>
                            <p>Items: {order.items.join(', ')}</p>
                            <p>Total: ${order.total.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}