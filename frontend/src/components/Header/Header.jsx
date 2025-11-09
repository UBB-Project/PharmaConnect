import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup.jsx";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const [showPopup, setShowPopup] = useState(false);
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

    const changeLanguage = (lng) => i18n.changeLanguage(lng);

    return (
        <header className="header">
            <div className="header-left">
                <div className="select-wrapper">
                    <select
                        value={i18n.language}
                        onChange={(e) => changeLanguage(e.target.value)}
                        aria-label="Select Language"
                    >
                        <option value="en">English</option>
                        <option value="ro">Română</option>
                    </select>
                </div>
            </div>

            <h1 className="header-title">PharmaConnect</h1>

            {!hideLogoutButton && (
                <button className="logout-btn"
                        onClick={handleLogoutClick}
                        aria-label="Log out of PharmaConnect"
                >
                    Log out
                </button>
            )}

            {showPopup && (
                <Popup
                    message={t("header.logoutConfirm")}
                    onConfirm={confirmLogout}
                />
            )}
        </header>
    );
}