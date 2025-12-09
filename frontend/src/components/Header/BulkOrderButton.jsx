import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import './BulkOrderButton.css';

const BulkOrderButton = () => {
    const fileInputRef = useRef(null);
    const toast = useRef(null);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Security Check
        if (file.type !== 'text/plain' && !file.name.toLowerCase().endsWith('.txt')) {
            toast.current.show({
                severity: 'error',
                summary: 'Invalid File',
                detail: 'Please upload a .txt file only.',
                life: 3000
            });
            event.target.value = null;
            return;
        }

        // Processing Toast (Will now be Teal!)
        toast.current.show({
            severity: 'info',
            summary: 'Processing',
            detail: 'Reading file...',
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
            }

            if (data.availableItems.length > 0 || data.outOfStockNames.length > 0 || data.notFoundNames.length > 0) {
                navigate('/cart', {
                    state: {
                        importSuccess: true,
                        addedCount: data.availableItems.length,
                        outOfStock: data.outOfStockNames,
                        notFound: data.notFoundNames
                    }
                });
            } else {
                toast.current.show({ severity: 'warn', summary: 'Empty', detail: 'No valid items found in file.', life: 3000 });
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
            <Toast ref={toast}/>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".txt"
                className="hidden-file-input"
            />

            <Button
                icon="pi pi-upload"
                className="p-button-outlined bulk-order-btn"
                onClick={handleButtonClick}
                tooltip="Upload Order List (.txt)"
                tooltipOptions={{ position: 'bottom' }}
            />
        </>
    );
};

export default BulkOrderButton;