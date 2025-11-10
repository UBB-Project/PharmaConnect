import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./Map.css";

const CLUJ = [46.7712, 23.6236];

const pin = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448599.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -26],
});

export default function Map() {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/map/pharmacies")
            .then((res) => res.json())
            .then((data) => setPharmacies(data))
            .catch((err) => console.error("Failed to load pharmacies:", err));
    }, []);

    return (
        <div className="map-wrap">
            <MapContainer center={CLUJ} zoom={13} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pharmacies.map((p) => (
                    <Marker
                        key={p.id}
                        position={[p.latitude, p.longitude]}
                        icon={pin}
                    >
                        <Popup><strong>{p.name}</strong></Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}