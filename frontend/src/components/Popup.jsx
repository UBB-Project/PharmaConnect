import React from "react";
import "./Popup.css";

export default function Popup({ message, onConfirm }) {
    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <p className="popup-message">{message}</p>
                <div className="popup-buttons">
                    <button className="yes-btn" onClick={() => onConfirm(true)}>
                        Yes
                    </button>
                    <button className="no-btn" onClick={() => onConfirm(false)}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
