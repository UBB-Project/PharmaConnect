import Navbar from "../../components/Navbar.jsx";
import PharmacyMap from "../../components/PharmacyMap.jsx";
import "./MapPage.css"
export default function MapPage() {
    return (
        <div className="page">
            <Navbar />
            <div className="page__content">
                <PharmacyMap />
            </div>
        </div>
    );
}