import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useTranslation } from 'react-i18next';
import './CartPage.css';

const API_BASE = "http://localhost:8080/api";
const USER_ID = "00000000-0000-0000-0000-000000000001";

export default function CartPage() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation("cart");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState("home");
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [checkoutLoading, setCheckoutLoading] = useState(false);

    const toast = useRef(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`${API_BASE}/cart/${USER_ID}`);
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                setCartItems(data);
            } catch (err) {
                console.error(err);
                setError(t("cart.error") || "Failed to load cart items.");
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, [i18n.language]);

    const handleQuantityChange = async (id, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const response = await fetch(`${API_BASE}/cart/${USER_ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, quantity: newQuantity })
            });
            if (!response.ok) throw new Error("Failed to update quantity");

            setCartItems(prev =>
                prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
            );
        } catch (err) {
            console.error(err);
            // Use toast instead of wiping the screen
            toast.current.show({
                severity: 'error',
                summary: t("cart.updateError") || "Failed to update quantity",
                life: 3000
            });
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/cart/${USER_ID}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error("Failed to remove item");

            setCartItems(prev => prev.filter(item => item.id !== id));

            toast.current.show({
                severity: 'success',
                summary: t("cart.removed") || "Item removed",
                life: 3000
            });

        } catch (err) {
            console.error(err);
            // FIX: Don't use setError here, or the whole page disappears. Use Toast.
            toast.current.show({
                severity: 'error',
                summary: t("cart.removeError") || "Failed to remove item.",
                life: 3000
            });
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;
        setCheckoutLoading(true);
        setError(null);

        try {
            for (const item of cartItems) {
                const response = await fetch(`${API_BASE}/cart/${USER_ID}/${item.id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error("Failed to remove item");
            }

            toast.current.show({
                severity: 'success',
                summary: t("cart.orderSuccess"),
                detail: "",
                life: 2000,
                className: 'center-toast'
            });

            setCartItems([]);

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } catch (err) {
            console.error(err);
            toast.current.show({
                severity: 'error',
                summary: t("cart.checkoutError") || "Checkout failed.",
                life: 1000
            });
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (loading) return <p>{t("common.loading")}</p>;

    if (error && cartItems.length === 0) return <p className="error">{error}</p>;

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <Toast ref={toast} />
            <h2>{t("cart.title")}</h2>

            {cartItems.length === 0 ? (
                <p>{t("cart.empty")}</p>
            ) : (
                <div className="cart-items">
                    {/* FIX: Added index and composite key to prevent duplicate key errors */}
                    {cartItems.map((item, index) => (
                        <div className="cart-item" key={`${item.id}-${index}`}>
                            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p className="brand">{item.brand}</p>
                                <p className="price">{item.price.toFixed(2)} LEI</p>
                                <div className="qty-actions">
                                    <label>{t("cart.quantity")}</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-danger"
                                        onClick={() => handleRemoveItem(item.id)}
                                        tooltip={t("cart.remove")}
                                        aria-label={t("cart.remove")}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h3>{t("cart.total")}: {totalPrice.toFixed(2)} LEI</h3>

                    <div className="checkout-options">
                        <label>
                            {t("cart.deliveryMethod")}:
                            <select value={deliveryMethod} onChange={e => setDeliveryMethod(e.target.value)}>
                                <option value="home">{t("cart.homeDelivery")}</option>
                                <option value="pickup">{t("cart.pickup")}</option>
                            </select>
                        </label>

                        <label>
                            {t("cart.paymentMethod")}:
                            <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                                <option value="card">{t("cart.card")}</option>
                                <option value="cash">{t("cart.cash")}</option>
                            </select>
                        </label>
                    </div>

                    <Button
                        label={t("cart.proceedCheckout")}
                        icon="pi pi-credit-card"
                        className="p-button-success"
                        onClick={handleCheckout}
                        loading={checkoutLoading}
                    />
                </div>
            )}
        </div>
    );
}