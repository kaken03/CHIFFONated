import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductList from '../components/products/ProductList';
import { useFirestore } from '../hooks/useFirestore';

const Home = () => {
    const { documents: featuredCakes } = useFirestore('cakes'); // Assuming 'cakes' is the collection name

    return (
        <div>
            <Navbar />
            <h1>Featured Cakes</h1>
            {featuredCakes ? (
                <ProductList products={featuredCakes} />
            ) : (
                <div>Loading...</div>
            )}
            <Footer />
        </div>
    );
};

export default Home;