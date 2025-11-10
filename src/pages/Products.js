import React, { useEffect, useState } from 'react';
import ProductList from '../components/products/ProductList';
import { db } from '../config/firebase'; // Assuming firebase.js exports the initialized Firestore instance

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const snapshot = await db.collection('products').get();
                const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a Loading component
    }

    return (
        <div>
            <h1>Our Cakes and Pastries</h1>
            <ProductList products={products} />
        </div>
    );
};

export default Products;