import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./PharmacyMap.css";

const CLUJ = [46.772229, 23.596226];

const MED_ICON_URLS = [
    "https://cdn-icons-png.flaticon.com/128/2966/2966327.png",
    "https://cdn-icons-png.flaticon.com/128/1032/1032989.png",
    "https://cdn-icons-png.flaticon.com/128/4287/4287703.png",
];

function makeIcon(iconUrl) {
    return L.icon({
        iconUrl,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -26],
    });
}

function hashStringToIndex(str, mod) {
    const s = String(str ?? "");
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return Math.abs(h) % mod;
}

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

    // cache Leaflet icon objects (important for performance)
    const iconObjects = useMemo(
        () => MED_ICON_URLS.map((url) => makeIcon(url)),
        []
    );

    const iconForPharmacy = (p) => {
        const key =
            p.id ??
            `${p.name ?? ""}|${p.address ?? ""}|${p.latitude ?? ""},${p.longitude ?? ""}`;
        const idx = hashStringToIndex(key, iconObjects.length);
        return iconObjects[idx];
    };

    return (
        <div className="map-wrap">
            <MapContainer center={CLUJ} zoom={13} scrollWheelZoom className="leaflet-map">
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {pharmacies.map((p) => (
                    <Marker
                        key={p.id ?? `${p.latitude}-${p.longitude}-${p.name}`}
                        position={[p.latitude, p.longitude]}
                        icon={iconForPharmacy(p)}
                    >
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
