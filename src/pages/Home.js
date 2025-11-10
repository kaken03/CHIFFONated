import React from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductCard from '../components/products/ProductCard';
import { useFirestore } from '../hooks/useFirestore';
import './Home.css'; // create this file and add plain CSS for the classes used below

// Temporary hardcoded sample products.
// In future you can remove this and rely on Firestore data returned from useFirestore.
const sampleFeatured = [
  { id: 'cake-001', name: 'Vanilla Chiffon', price: 24.0, image: '/images/cakes/vanilla.jpg' },
  { id: 'cake-002', name: 'Chocolate Truffle', price: 30.0, image: '/images/cakes/chocolate.jpg' },
  { id: 'cake-003', name: 'Strawberry Shortcake', price: 28.0, image: '/images/cakes/strawberry.jpg' },
];

const Home = () => {
  const history = useHistory();

  // keep useFirestore call so it can be used when products are added to Firestore
  const { documents: firestoreDocs, loading } = useFirestore('cakes');

  // Use Firestore docs when available, otherwise fallback to sample data
  const featuredProducts = Array.isArray(firestoreDocs) && firestoreDocs.length ? firestoreDocs : sampleFeatured;

  return (
    <div className="home-page">
      <Navbar />

      {/* HERO */}
      <section className="hero section-hero">
        <div className="hero-inner container">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to CHIFFONated</h1>
            <p className="hero-subtitle">
              Handcrafted chiffon cakes made fresh for your celebrations. Light, fluffy and delightful.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => history.push('/products')}>
                Order Now
              </button>
            </div>
          </div>
          {/* placeholder hero image area */}
          <div className="hero-image" aria-hidden="true" />
        </div>
      </section>

      {/* ABOUT */}
      {/* <section className="about section-about container">
        <h2>About CHIFFONated</h2>
        <p>
          We are a small family bakery specializing in chiffon cakes and custom orders for birthdays,
          weddings and special events. We use premium ingredients and bake to order.
        </p>
      </section> */}

      {/* FEATURED PRODUCTS */}
      <section className="featured section-featured container">
        <div className="section-header">
          <h2>Featured Cakes</h2>
          <div>
            <button className="btn btn-secondary" onClick={() => history.push('/products')}>
              View All
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading featured cakes…</div>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((p) => (
              // ProductCard should accept { product } prop (id, name, price, image)
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Note: To fetch only featured items from Firestore later, update useFirestore call:
            const { documents } = useFirestore('cakes', { where: ['featured', '==', true], orderBy: ['createdAt', 'desc'] })
        */}
      </section>

      {/* CALL TO ACTION */}
      <section className="cta section-cta">
        <div className="container cta-inner">
          <div className="cta-text">
            <h3>Ready to delight your guests?</h3>
            <p>Place your order today — pick your cake, tell us the details, and we'll handle the rest.</p>
          </div>
          <div className="cta-action">
            <button className="btn btn-primary" onClick={() => history.push('/products')}>
              Start Your Order
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;