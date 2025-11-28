import PharmacyMap from "../../components/Map/PharmacyMap.jsx";
import "./MapPage.css"

export default function MapPage() {
    return (
        <div className="page">
            <div className="page__content">
                <PharmacyMap />
            </div>
        </div>
    );
}