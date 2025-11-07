import React from "react";
import { useTranslation } from "react-i18next";
import "./HomePage.css";

export default function HomePage() {
    const { t } = useTranslation("home");

    return (
    <div className="home-page">
      <h2>{t("home.welcome")}</h2>
      <p>{t("home.tagline")}</p>
    </div>
  );
}
