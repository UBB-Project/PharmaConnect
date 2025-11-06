import React from "react";
import { useTranslation } from "react-i18next";
import "./LoginPage.css";

export default function LoginPage() {
    const { t } = useTranslation("login");

    return (
        <div className="login-container">
            <h2>{t("loginTitle")}</h2>
        </div>
    );
}
