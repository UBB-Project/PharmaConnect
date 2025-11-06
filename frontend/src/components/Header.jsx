import React, { useState } from "react";
import Popup from "./Popup";
import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        setShowPopup(true);
    };

    const confirmLogout = (confirm) => {
        setShowPopup(false);
        if (confirm) {
            navigate("/login");
        }
    };

    return (
        <header className="header">
            <div className="header-left"></div>
            <h1 className="header-title">PharmaConnect</h1>
            <button className="logout-btn" onClick={handleLogoutClick}>
                Log out
            </button>

            {showPopup && (
                <Popup
                    message="Are you sure you want to do this?"
                    onConfirm={confirmLogout}
                />
            )}
        </header>
    );
}
