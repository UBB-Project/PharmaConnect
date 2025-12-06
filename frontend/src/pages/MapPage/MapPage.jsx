import PharmacyMap from "../../components/Map/PharmacyMap.jsx";
import "./MapPage.css";

export default function MapPage() {
    return (
        <div className="map-page-container">
            <div className="map-content">
                <PharmacyMap />
            </div>
        </div>
    );
}