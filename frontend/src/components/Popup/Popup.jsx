import React from "react";
import { useTranslation } from "react-i18next";
import "./Popup.css";

export default function Popup({ message, onConfirm }) {
    const { t } = useTranslation(["common", "header"]);

    return (
        <div className="popup-overlay">
            <div className="popup-box">
                <p id="popup-message" className="popup-message">{message}</p>
                <div className="popup-buttons">
                    <button className="yes-btn"
                            onClick={() => onConfirm(true)}
                            aria-label="Confirm"
                    >
                        {t("common:yes")}
                    </button>
                    <button className="no-btn"
                            onClick={() => onConfirm(false)}
                            aria-label="Cancel"
                    >
                        {t("common:no")}
                    </button>
                </div>
            </div>
        </div>
    );
}
