import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../Popup/Popup.jsx";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeSwitcher from "../Theme/ThemeSwitcher.jsx";
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import BulkOrderButton from './BulkOrderButton';

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

    const languages = [
        { label: 'English', value: 'en', code: 'gb' },
        { label: 'Română', value: 'ro', code: 'ro' }
    ];

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.value);
    };

    const countryOptionTemplate = (option) => {
        if (!option) {
            return <span>Select</span>;
        }

        return (
            <div className="language-item">
                <span className={`fi fi-${option.code}`}></span>
                <span>{option.label}</span>
            </div>
        );
    };

    const currentVal = languages.find(l => l.value === i18n.language) ? i18n.language : languages[0].value;

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
                    <div style={{ marginRight: '1rem' }}>
                        <BulkOrderButton />
                    </div>
                )}
            </div>

            <h1 className="header-title" onClick={() => navigate("/")} >PharmaConnect</h1>

            <div className="header-right">
                <ThemeSwitcher />
                {!hideLogoutButton && (
                    <Button
                        label="Log out"
                        icon="pi pi-sign-out"
                        className="p-button-outlined"
                        onClick={handleLogoutClick}
                        aria-label="Log out"
                    />
                )}
            </div>
            {showPopup && (
                <Popup
                    message={t("header.logoutConfirm")}
                    onConfirm={confirmLogout}
                />
            )}
        </header>
    );
}