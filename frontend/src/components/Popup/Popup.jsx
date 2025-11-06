import React from "react";
import "./Popup.css";

export default function Popup({ message, onConfirm }) {
    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <p id="popup-message" className="popup-message">{message}</p>
                <div className="popup-buttons">
                    <button className="yes-btn"
                            onClick={() => onConfirm(true)}
                            aria-label="Confirm"
                    >
                        Yes
                    </button>
                    <button className="no-btn"
                            onClick={() => onConfirm(false)}
                            aria-label="Cancel"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
