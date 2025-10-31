import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "./PharmacyMap.css";

const CLUJ = [46.7712, 23.6236];

// simple custom icon (replace with other asset if you want)
const pin = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448599.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -26],
});

// demo hard coded markers
const pharmacies = [
    { id: 1, name: "Catena - Mihai Viteazul", pos: [46.7719, 23.5957] },
    { id: 2, name: "Help Net - Dorobanților", pos: [46.7709, 23.6121] },
    { id: 3, name: "Sensiblu - Iulius Mall", pos: [46.7739, 23.6222] },
];

export default function PharmacyMap() {
    return (
        <div className="map-wrap">
            <MapContainer center={CLUJ} zoom={13} scrollWheelZoom>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pharmacies.map(p => (
                    <Marker key={p.id} position={p.pos} icon={pin}>
                        <Popup><strong>{p.name}</strong></Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}