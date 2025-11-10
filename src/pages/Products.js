import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import ProductList from '../components/products/ProductList';
import Navbar from '../components/common/Navbar';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    // Categories for filter - adjust based on your needs
    const categories = [
        { id: 'all', name: 'All Cakes' },
        { id: 'chiffon', name: 'Chiffon Cakes' },
        { id: 'birthday', name: 'Birthday Cakes' },
        { id: 'wedding', name: 'Wedding Cakes' },
        { id: 'custom', name: 'Custom Cakes' }
    ];

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, sortBy]);

    const fetchProducts = async () => {
        try {
            let productsRef = collection(db, 'products');
            let constraints = [];

            if (selectedCategory !== 'all') {
                constraints.push(where('category', '==', selectedCategory));
            }

            switch (sortBy) {
                case 'price-asc':
                    constraints.push(orderBy('price', 'asc'));
                    break;
                case 'price-desc':
                    constraints.push(orderBy('price', 'desc'));
                    break;
                case 'name':
                    constraints.push(orderBy('name'));
                    break;
                default:
                    constraints.push(orderBy('createdAt', 'desc'));
            }

            const q = query(productsRef, ...constraints);
            const snapshot = await getDocs(q);
            let productsData = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            }));

            // Client-side filtering for search and price range
            if (searchTerm) {
                productsData = productsData.filter(product => 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (priceRange.min || priceRange.max) {
                productsData = productsData.filter(product => {
                    const price = Number(product.price);
                    const min = priceRange.min ? Number(priceRange.min) : 0;
                    const max = priceRange.max ? Number(priceRange.max) : Infinity;
                    return price >= min && price <= max;
                });
            }

            setProducts(productsData);
        } catch (error) {
            console.error("Error fetching products: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-page">
            <Navbar />
            <div className="products-page container">
                {/* Header Section */}
                <div className="products-header">
                    <h1>Our Cakes and Pastries</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search cakes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="products-content">
                    {/* Filters Sidebar */}
                    <aside className="products-filters">
                        <div className="filter-section">
                            <h3>Categories</h3>
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category.id)}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        <div className="filter-section">
                            <h3>Price Range</h3>
                            <div className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                                />
                                <span>-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                                />
                            </div>
                            <button 
                                className="btn btn-secondary" 
                                onClick={fetchProducts}
                            >
                                Apply
                            </button>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <main className="products-main">
                        <div className="products-controls">
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sort-select"
                            >
                                <option value="default">Latest</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="name">Name</option>
                            </select>
                        </div>

                        {loading ? (
                            <div className="loading">Loading cakes...</div>
                        ) : (
                            <ProductList products={products} />
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Products;