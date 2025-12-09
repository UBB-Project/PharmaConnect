import React from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import "./CartPreview.css";

export default function CartPreview({ cartItems, onRemove }) {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-preview">
            {cartItems.length === 0 ? (
                <div className="cart-preview-empty">
                    {/* Icon mare pentru cos gol */}
                    <i className="pi pi-shopping-cart cart-empty-icon"></i>
                    <p>Your cart is empty</p>
                </div>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <div className="cart-preview-item" key={item.id}>
                            <img src={item.imageUrl} alt={item.name} className="cart-preview-img" />
                            <div className="cart-preview-info">
                                <p className="name">{item.name}</p>
                                <p className="quantity">{item.quantity} x {item.price.toFixed(2)} LEI</p>
                            </div>
                            <Button
                                icon="pi pi-times"
                                className="p-button-text p-button-danger"
                                onClick={() => onRemove(item.id)}
                            />
                        </div>
                    ))}
                    <Divider />
                    <div className="cart-preview-total">
                        <b>Total: </b>{totalPrice.toFixed(2)} LEI
                    </div>
                </>
            )}
        </div>
    );
}
