import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import './CartPage.css';

const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    const { importSuccess, addedCount, outOfStock, notFound } = location.state || {};

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('temp_cart_import') || '[]');
        setCartItems(storedItems);
    }, []);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price || 0), 0).toFixed(2);
    };

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h1 className="cart-title">Your Shopping Cart</h1>

                {importSuccess && (
                    <div className="import-report-container">
                        <h3>Import Report</h3>

                        {addedCount > 0 && (
                            <div className="report-item success">
                                <i className="pi pi-check-circle"></i>
                                <span>Successfully added <strong>{addedCount}</strong> items to your cart.</span>
                            </div>
                        )}

                        {outOfStock && outOfStock.length > 0 && (
                            <div className="report-item warning">
                                <div className="report-header">
                                    <i className="pi pi-exclamation-triangle"></i>
                                    <span><strong>Out of Stock</strong> (These were not added):</span>
                                </div>
                                <ul className="report-list">
                                    {outOfStock.map((name, i) => <li key={i}>{name}</li>)}
                                </ul>
                            </div>
                        )}

                        {notFound && notFound.length > 0 && (
                            <div className="report-item error">
                                <div className="report-header">
                                    <i className="pi pi-times-circle"></i>
                                    <span><strong>Unknown Items</strong> (Check spelling):</span>
                                </div>
                                <ul className="report-list">
                                    {notFound.map((name, i) => <li key={i}>{name}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                <div className="cart-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <i className="pi pi-shopping-cart" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                            <p>Your cart is empty.</p>
                            <Button label="Go to Shop" outlined onClick={() => navigate('/')} />
                        </div>
                    ) : (
                        <>
                            <div className="cart-items-list">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="cart-item-card">
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <span className="item-brand">{item.brand}</span>
                                        </div>
                                        <div className="item-price">
                                            ${item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <h3>Total: ${calculateTotal()}</h3>
                                <div className="cart-actions">
                                    <Button label="Continue Shopping" outlined onClick={() => navigate('/')} />
                                    <Button label="Checkout" severity="success" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPage;