import React, { useState, useEffect } from 'react';
// 💡 Removed useLocation and Navigate
import { useTranslation } from 'react-i18next';
import './OrderPage.css'; // We will create this CSS file for styling

const API_BASE = "http://localhost:8080/api";

// 💡 This is the hardcoded data you want to send every time
const hardcodedReservationData = {
    "type": "reservation",
    "quantity": 1,
    "itemId": "e3182925-cac0-40f5-994a-0b8505adede9",
    "userId": "45c3cdd3-9dc9-4936-a02b-d337dafe39c2"
};

export default function OrdersPage() {
    // 💡 Removed location hook
    const { t } = useTranslation();
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 💡 Removed: const reservationData = location.state?.reservation;

    useEffect(() => {
        // This function will be called once when the component mounts
        const generateQrCode = async () => {
            // 💡 Removed check for reservationData, as we now use the hardcoded one
            try {
                // Make the POST request to your backend controller
                const response = await fetch(`${API_BASE}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // 💡 Send the hardcoded data
                    body: JSON.stringify(hardcodedReservationData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status} - ${response.statusText}`);
                }

                // Your backend returns a direct image/png blob
                const imageBlob = await response.blob();

                // Create a temporary URL for the blob to use in an img tag
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

        // Cleanup function: Revoke the object URL to avoid memory leaks
        // when the component is unmounted.
        return () => {
            if (qrCodeUrl) {
                URL.revokeObjectURL(qrCodeUrl);
            }
        };
        // 💡 Simplified dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [t]);

    // 💡 Removed the redirect logic
    // if (!reservationData && !loading) { ... }

    return (
        <div className="orders-page-container">
            {loading && (
                <div className="loading-text">{t('orders.loading')}</div>
            )}

            {error && (
                <div className="error-text">{error}</div>
            )}

            {qrCodeUrl && !loading && !error && (
                <div className="qr-code-wrapper">
                    <img
                        src={qrCodeUrl}
                        alt={t('orders.alt')}
                        className="qr-code-image"
                    />
                </div>
            )}
        </div>
    );
}