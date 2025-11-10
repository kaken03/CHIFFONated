import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ProductList.css';

const ProductList = ({ products }) => {
    const { addToCart } = useCart();

    if (!products?.length) {
        return (
            <div className="no-products">
                <p>No products found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <Link to={`/products/${product.id}`} className="product-image-link">
                        <div 
                            className="product-image" 
                            style={{ backgroundImage: `url(${product.image})` }}
                        >
                            {product.discount > 0 && (
                                <span className="discount-badge">-{product.discount}%</span>
                            )}
                        </div>
                    </Link>
                    
                    <div className="product-info">
                        <Link to={`/products/${product.id}`} className="product-name">
                            {product.name}
                        </Link>
                        
                        <div className="product-price">
                            {product.discount > 0 ? (
                                <>
                                    <span className="original-price">${product.price}</span>
                                    <span className="discounted-price">
                                        ${(product.price * (1 - product.discount/100)).toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span>${product.price}</span>
                            )}
                        </div>

                        {product.stock > 0 ? (
                            <button 
                                className="add-to-cart-btn"
                                onClick={() => addToCart(product)}
                            >
                                Add to Cart
                            </button>
                        ) : (
                            <button className="out-of-stock-btn" disabled>
                                Out of Stock
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;