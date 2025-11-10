const Navbar = () => {
    return (
        <nav>
            <h1>CHIFFONated</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/orders">My Orders</a></li>
                <li><a href="/admin/dashboard">Admin</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;