import React, { useState } from "react";
import Popup from "../Popup/Popup.jsx";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogoutClick = () => {
        setShowPopup(true);
    };


    const confirmLogout = (confirm) => {
        setShowPopup(false);
        if (confirm) {
            navigate("/login");
        }
    };

    const hideLogoutButton = location.pathname === "/login";

    return (
        <header className="header">
            <div className="header-left"></div>
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
                    message="Are you sure you want to logout?"
                    onConfirm={confirmLogout}
                />
            )}
        </header>
    );
}