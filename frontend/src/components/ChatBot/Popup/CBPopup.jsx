import React, { useRef, useEffect } from "react";
import "./CBPopup.css";

const Popup = ({ isOpen, onClose, title, icon, children }) => {
    const popupRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

    const startDrag = (e) => {
        if (!popupRef.current) return;

        const rect = popupRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    };

    const onDrag = (e) => {
        if (popupRef.current) {
            popupRef.current.style.left = `${e.clientX - offset.current.x}px`;
            popupRef.current.style.top = `${e.clientY - offset.current.y}px`;
            popupRef.current.style.bottom = "auto";
            popupRef.current.style.right = "auto";
        }
    };

    const stopDrag = () => {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    };

    useEffect(() => {
        return () => {
            document.removeEventListener("mousemove", onDrag);
            document.removeEventListener("mouseup", stopDrag);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="popup-container" ref={popupRef}>
            <div className="popup-header" onMouseDown={startDrag}>
                <span className="popup-title">
                    {icon && <i className={icon}></i>}
                    {title}
                </span>
                <button className="popup-close-btn" onClick={onClose}>
                    &times;
                </button>
            </div>

            <div className="popup-body">
                {children}
            </div>
        </div>
    );
};

export default Popup;