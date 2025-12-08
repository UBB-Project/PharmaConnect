import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const BulkOrderButton = () => {
    const fileInputRef = useRef(null);
    const toast = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        toast.current.show({
            severity: 'info',
            summary: 'Processing',
            detail: 'Reading file and checking stock...',
            life: 2000
        });

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8080/api/items/bulk-order', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Backend upload failed');

            const data = await response.json();

            if (data.availableItems.length > 0) {
                const existing = JSON.parse(localStorage.getItem('temp_cart_import') || '[]');
                localStorage.setItem('temp_cart_import', JSON.stringify([...existing, ...data.availableItems]));

                toast.current.show({
                    severity: 'success',
                    summary: 'Import Successful',
                    detail: `Found ${data.availableItems.length} items. Added to temporary storage.`,
                    life: 3000
                });
            }

            if (data.outOfStockNames.length > 0 || data.notFoundNames.length > 0) {
                let errorDetails = [];

                if (data.outOfStockNames.length > 0) {
                    errorDetails.push(`Out of Stock: ${data.outOfStockNames.length} items`);
                }
                if (data.notFoundNames.length > 0) {
                    errorDetails.push(`Unknown items: ${data.notFoundNames.length} items`);
                }

                toast.current.show({
                    severity: 'warn',
                    summary: 'Partial Import Issues',
                    detail: errorDetails.join(', '),
                    sticky: true
                });
            }

        } catch (error) {
            console.error("Upload Error:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Upload Error',
                detail: 'Could not process the file.',
                life: 3000
            });
        } finally {
            event.target.value = null;
        }
    };

    return (
        <>
            <Toast ref={toast} />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt"
                style={{ display: 'none' }}
            />
            <Button
                icon="pi pi-upload"
                className="p-button-rounded p-button-text"
                style={{ color: '#0f766e', width: '2.5rem', height: '2.5rem' }}
                onClick={handleButtonClick}
                tooltip="Upload Order List (.txt)"
                tooltipOptions={{ position: 'bottom' }}
            />
        </>
    );
};

export default BulkOrderButton;