import React, { useRef } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import './BulkOrderButton.css';

// Constants must match your CartPage
const API_BASE = "http://localhost:8080/api";
const USER_ID = "00000000-0000-0000-0000-000000000001";

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

        if (
            file.type !== 'text/plain' &&
            !file.name.toLowerCase().endsWith('.txt') &&
            !file.type.startsWith('image/')
        ) {
            toast.current.show({
                severity: 'error',
                summary: 'Invalid File',
                detail: 'Please upload a .txt file or an image.',
                life: 3000
            });
            event.target.value = null;
            return;
        }

        toast.current.show({
            severity: 'info',
            summary: 'Processing',
            detail: file.type.startsWith('image/')
                ? 'Reading handwritten text...'
                : 'Analyzing file for matches...',
            life: 2000
        });

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(
                file.type.startsWith('image/')
                    ? `${API_BASE}/image/ocr`
                    : `${API_BASE}/items/bulk-order`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!response.ok) throw new Error('Backend analysis failed');

            const data = await response.json();

            if (file.type.startsWith('image/')) {

                const textBlob = new Blob([data.text || ''], { type: 'text/plain' });
                const textFile = new File([textBlob], 'ocr.txt', { type: 'text/plain' });

                const textFormData = new FormData();
                textFormData.append('file', textFile);

                const bulkResponse = await fetch(`${API_BASE}/items/bulk-order`, {
                    method: 'POST',
                    body: textFormData
                });

                if (!bulkResponse.ok) throw new Error('Backend analysis failed');

                const bulkData = await bulkResponse.json();

                // data structure expected:
                // { availableItems: [{id, name, ...}], outOfStockNames: [], notFoundNames: [] }

                // 3. If items found, ADD them to the DB Cart
                if (bulkData.availableItems && bulkData.availableItems.length > 0) {

                    toast.current.show({
                        severity: 'info',
                        summary: 'Syncing',
                        detail: `Adding ${bulkData.availableItems.length} items to cart...`,
                        life: 2000
                    });

                    // Create a promise for each item to be added to the cart
                    const addToCartPromises = bulkData.availableItems.map(item => {
                        return fetch(`${API_BASE}/cart/${USER_ID}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: item.id, // This requires the Java fix mentioned above
                                quantity: 1  // Default quantity
                            })
                        });
                    });

                    // Wait for all items to be added to the database
                    await Promise.all(addToCartPromises);
                }

                // 4. Navigate to Cart Page
                // We pass the results in state so CartPage can show a summary Toast
                if (
                    bulkData.availableItems.length > 0 ||
                    bulkData.outOfStockNames.length > 0 ||
                    bulkData.notFoundNames.length > 0
                ) {
                    navigate('/cart', {
                        state: {
                            importSuccess: true,
                            addedCount: bulkData.availableItems.length,
                            outOfStock: bulkData.outOfStockNames,
                            notFound: bulkData.notFoundNames
                        }
                    });
                } else {
                    toast.current.show({ severity: 'warn', summary: 'Empty', detail: 'No valid items found.', life: 3000 });
                }

            } else {

                // data structure expected:
                // { availableItems: [{id, name, ...}], outOfStockNames: [], notFoundNames: [] }

                // 3. If items found, ADD them to the DB Cart
                if (data.availableItems && data.availableItems.length > 0) {

                    toast.current.show({
                        severity: 'info',
                        summary: 'Syncing',
                        detail: `Adding ${data.availableItems.length} items to cart...`,
                        life: 2000
                    });

                    // Create a promise for each item to be added to the cart
                    const addToCartPromises = data.availableItems.map(item => {
                        return fetch(`${API_BASE}/cart/${USER_ID}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                id: item.id, // This requires the Java fix mentioned above
                                quantity: 1  // Default quantity
                            })
                        });
                    });

                    // Wait for all items to be added to the database
                    await Promise.all(addToCartPromises);
                }

                // 4. Navigate to Cart Page
                // We pass the results in state so CartPage can show a summary Toast
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
                    toast.current.show({ severity: 'warn', summary: 'Empty', detail: 'No valid items found.', life: 3000 });
                }
            }

        } catch (error) {
            console.error("Bulk Order Error:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not process the bulk order.',
                life: 3000
            });
        } finally {
            // Reset input so the same file can be selected again if needed
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
                accept=".txt,image/*"
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
