import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';

export const API_BASE = "http://localhost:8080/api";

export default function ReservationConfirmationDialog(props) {
    const { t } = useTranslation();
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {visible, setVisible, reservation } = props;

    useEffect(() => {
        const generateQrCode = async () => {
            try {
                const response = await fetch(`${API_BASE}/orders/qr/${reservation.id}`);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
                }

                const imageBlob = await response.blob();

                const imageUrl = URL.createObjectURL(imageBlob);
                setQrCodeUrl(imageUrl);

            } catch (err) {
                console.error("Failed to generate QR code:", err);
                setError(t('orders.error'));
            } finally {
                setLoading(false);
            }
        };

        generateQrCode();

        return () => {
            if (qrCodeUrl) {
                URL.revokeObjectURL(qrCodeUrl);
            }
        };
    }, [visible]);

    const downloadQR = () => {
        const link = document.createElement("a");
        link.href = qrCodeUrl;
        link.download = `reservation-qr-${reservation.id}.png`;
        link.click();
    };

    if(reservation == null) {
        return (<div></div>);
    }
    
    const footer = (
        <div style = {{display: "flex", flexDirection: "row", gap: "1.5rem", alignItems: "right", padding: "1.5rem"}}>
            <Button label="Download QR Code" icon="pi pi-download" onClick={downloadQR} style={{backgroundColor: '#115e59', display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.25rem" }}/>
        </div>
    )
    const header = (<div style= {{padding: "1.5rem"}}>Reservation placed</div>)

    const closeIcon = (<i className="pi pi-times" style={{ fontSize: '1rem', margin: '1.5rem' }}></i>);

    return (<>
        <Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }} resizable= {false} closeIcon= {closeIcon} modal>
            <Card footer={footer}>
                <div style={{ display: "flex", flexDirection: "row", gap: "1.5rem", alignItems: "right", padding: "1.5rem", width: "100%" }}>
                    <div style={{ padding: "1rem", borderRadius: "12px", flex: 1, width: "50%" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>{reservation.item.name}</h2>
                        <p style={{ marginBottom: "0.25rem" }}>Quantity: {reservation.quantity}</p>
                        <p style={{ marginBottom: "0.25rem" }}>Reserved At Pharmacy: PharmaConnect</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem",  borderRadius: "12px" }}>
                        <img id="qrCodeCanvas" src={qrCodeUrl} style={{ borderRadius: "12px"}}/>
                    </div>
                </div>
            </Card>
        </Dialog>
    </>)
}