import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./PharmacyMap.css";

const CLUJ = [46.772229, 23.596226];

const pin = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/4287/4287703.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -26],
});
export default function PharmacyMap() {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/map/pharmacies")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) =>
                setPharmacies(
                    data.map((p) => ({
                        ...p,
                        latitude: parseFloat(p.latitude),
                        longitude: parseFloat(p.longitude),
                    }))
                )
            )
            .catch((err) => console.error("Failed to load pharmacies:", err));
    }, []);

    return (
        <div className="map-wrap">
            <MapContainer center={CLUJ} zoom={13} scrollWheelZoom className="leaflet-map">
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pharmacies.map((p, index) => (
                    <Marker key={index} position={[p.latitude, p.longitude]} icon={pin}>
                        <Popup>
                            <div className="popup">
                                <strong className="popup-title">{p.name}</strong>
                                <div className="popup-address">{p.address}</div>
                                <div className="popup-hours">🕒{p.openHours}</div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}