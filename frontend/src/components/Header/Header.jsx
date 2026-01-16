import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup.jsx";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "../Theme/ThemeSwitcher.jsx";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import BulkOrderButton from '../BulkOrderButton/BulkOrderButton.jsx';
import CartPreview from "../../pages/CartPage/CartPreview.jsx";


export default function Header() {
    const API_BASE = "http://localhost:8080/api";
    const USER_ID = "00000000-0000-0000-0000-000000000001";

    const [showPopup, setShowPopup] = useState(false);
    const [showCartPreview, setShowCartPreview] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { t, i18n } = useTranslation(["header", "common"]);
    const navigate = useNavigate();
    const location = useLocation();
    const hideLogoutButton = location.pathname === "/login";

    const handleLogoutClick = () => setShowPopup(true);

    const confirmLogout = (confirm) => {
        setShowPopup(false);
        if (confirm) {
            navigate("/login");
        }
    };

    const languages = [
        { label: 'English', value: 'en', code: 'gb' },
        { label: 'Română', value: 'ro', code: 'ro' }
    ];

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.value);
    };

    const countryOptionTemplate = (option) => {
        if (!option) return <span>Select</span>;
        return (
            <div className="language-item">
                <span className={`fi fi-${option.code}`}></span>
                <span>{option.label}</span>
            </div>
        );
    };

    const currentVal = languages.find(l => l.value === i18n.language) ? i18n.language : languages[0].value;

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch(`${API_BASE}/cart/${USER_ID}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setCartItems(data);
            } catch (err) {
                console.error("Header fetch cart error:", err);
            }
        };
        fetchCart();
        // Added location.pathname so the cart refreshes when you change pages
    }, [location.pathname]);

    const handleRemoveItem = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/cart/${USER_ID}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error("Failed to remove item");

            setCartItems(prev => prev.filter(item => item.id !== id));
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <header className="header">
            <div className="header-left">
                <Dropdown
                    value={currentVal}
                    onChange={changeLanguage}
                    options={languages}
                    optionLabel="label"
                    valueTemplate={countryOptionTemplate}
                    itemTemplate={countryOptionTemplate}
                    className="language-dropdown"
                    panelClassName="language-dropdown-panel"
                    aria-label="Select Language"
                />

                {!hideLogoutButton && (
                    <BulkOrderButton />
                )}
            </div>

            <h1 className="header-title" onClick={() => navigate("/")} >PharmaConnect</h1>

            <div className="header-right">
                <ThemeSwitcher />
                <div
                    className="cart-wrapper"
                    onMouseEnter={() => setShowCartPreview(true)}
                    onMouseLeave={() => setShowCartPreview(false)}
                >
                    <Button
                        icon="pi pi-shopping-cart"
                        className="p-button-outlined p-button-rounded cart-button"
                        onClick={() => navigate("/cart")}
                        aria-label="Cart"
                    >
                        {/* Optional: Add badge count if items exist */}
                        {cartItems.length > 0 && (
                            <span className="cart-badge"
                                  style={{
                                      position: 'absolute',
                                      top: '0',
                                      right: '0',
                                      background: '#d32f2f',
                                      color: 'white',
                                      borderRadius: '50%',
                                      padding: '0.2rem 0.4rem',
                                      fontSize: '0.7rem',
                                  }}>
                                {cartItems.length}
                            </span>
                        )}
                    </Button>

                    {showCartPreview && (
                        <CartPreview
                            cartItems={cartItems}
                            onRemove={handleRemoveItem}
                        />
                    )}
                </div>


                {!hideLogoutButton && (
                    <Button
                        label="Log out"
                        icon="pi pi-sign-out"
                        className="p-button-outlined logout-btn"
                        onClick={handleLogoutClick}
                        aria-label="Log out"
                    />
                )}
            </div>

            {showPopup && (
                <Popup
                    message={t("header.logoutConfirm")}
                    onConfirm={(confirm) => confirmLogout(confirm)}
                />
            )}
        </header>
    );
}