import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useTranslation } from "react-i18next";
import './MiniMapWidget.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const CLUJ = [46.772229, 23.596226];

export default function MiniMapWidget() {
    const { t } = useTranslation("home");

    return (
        <div className="mini-map-wrapper">
            <div className="mini-map-overlay"></div>

            <MapContainer
                center={CLUJ}
                zoom={13}
                scrollWheelZoom={false}
                zoomControl={false}
                dragging={false}
                doubleClickZoom={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                <Marker position={CLUJ} />
            </MapContainer>

            <div className="mini-map-badge">
                <i className="pi pi-compass"></i>
                {t("home.clickToExplore") || "Click to explore"}
            </div>
        </div>
    );
}