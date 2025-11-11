import PharmacyMap from "../../components/Map/PharmacyMap.jsx";
import "./MapPage.css"
import {Link} from "react-router-dom";
export default function MapPage() {
    return (
        <div className="page">
            <div className="page__content">
                <Link className="main-page__link" to="/">Home</Link>
                <PharmacyMap />
            </div>
        </div>
    );
}