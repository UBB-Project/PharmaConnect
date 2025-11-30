import PharmacyMap from "../../components/Map/PharmacyMap.jsx";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";
import "./MapPage.css";

export default function MapPage() {
    const { t } = useTranslation("home");

    return (
        <div className="map-page-container">
            <div className="map-navigation">
                <Link to="/" className="nav-link">
                    <Button
                        label={t("home.back") || "Back to Home"}
                        icon="pi pi-arrow-left"
                        className="super-btn-primary"
                        rounded
                    />
                </Link>
            </div>

            <div className="map-content">
                <PharmacyMap />
            </div>
        </div>
    );
}