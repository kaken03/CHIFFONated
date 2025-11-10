export default function ProductDetails() {
    // Sample product data (replace with actual data fetching logic)
    const product = {
        id: 1,
        name: "Chocolate Cake",
        description: "Delicious chocolate cake with rich frosting.",
        price: 25.00,
        imageUrl: "https://example.com/chocolate-cake.jpg"
    };

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <h2>${product.price.toFixed(2)}</h2>
            <button>Add to Cart</button>
        </div>
    );
}