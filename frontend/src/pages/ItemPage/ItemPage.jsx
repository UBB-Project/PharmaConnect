import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useTranslation } from "react-i18next";
import { TabView, TabPanel } from 'primereact/tabview';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import "./ItemPage.css";
import ReserveButton from "./ReserveButton";

const API_BASE = "http://localhost:8080/api";

export default function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const { t, i18n } = useTranslation();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    // Notify logic
    const [notifyEmail, setNotifyEmail] = useState("");
    const [notifyError, setNotifyError] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    // Added state for the Add to Cart action
    const [reserved, setReserved] = useState(false);

    const inc = () => setQty((q) => q + 1);
    const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

    const handleNotifySubscribe = () => {
        if (!notifyEmail.includes("@")) {
            setNotifyError(t("item.setNotifyError"));
            return;
        }
        setSubscribed(true);
        setNotifyError("");
    };

    useEffect(() => {
        const load = async () => {
            try {
                const r = await fetch(`${API_BASE}/items/${id}/${i18n.language}`);
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const data = await r.json();
                setItem({ ...data, stock: data.stock_quantity });
            } catch {
                setError(t("item.error"));
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, i18n.language]);

    // Hardcoded User ID for testing
    const USER_ID = "00000000-0000-0000-0000-000000000001";

    // This function handles the "Add to Cart" logic
    const addToCart = async () => {
        try {
            const response = await fetch(`${API_BASE}/cart/${USER_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: item.id, quantity: qty })
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);

            setReserved(true);
            navigate("/cart");

        } catch (err) {
            console.error("Failed to add item to cart:", err);
        }
    };

    if (loading) return <div className="container">{t("item.loading")}</div>;
    if (error) return <div className="container error">{error}</div>;
    if (!item) return null;

    const priceFormatted =
        typeof item.price === "number"
            ? new Intl.NumberFormat(i18n.language, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(item.price)
            : item.price;

    const tt = (field, fallback) =>
        t(`item.products.${id}.${field}`, { defaultValue: fallback });

    const outOfStock = item.stock === 0;

    return (
        <div className="container">
            <div className="breadcrumb">
                {item.category} / {item.brand}
            </div>

            <div className="tei-top">
                <div className="tei-left">
                    <img
                        src={item.imageUrl}
                        alt={tt("name", item.name)}
                        className="tei-hero"
                    />
                    <div className="img-note">{t("item.imageNote")}</div>
                </div>

                <div className="tei-middle">
                    <h1 className="tei-title">{tt("name", item.name)}</h1>
                    <div className="tei-quicklist">
                        <div>
                            <b>{t("item.brand")}:</b> {item.brand}
                        </div>
                        <div>
                            <b>{t("item.range")}:</b> {t(`item.categories.${item.category}`, { defaultValue: item.category })}
                        </div>
                        <div>
                            <b>{t("item.expires")}:</b> {item.expirationDate}
                        </div>
                        <div>
                            <b>{t("item.soldBy")}:</b> {t("item.soldByName")}
                        </div>
                    </div>

                    <div className="tei-badges">
                        <Tag className="rx-tag"
                             value={item.prescriptionRequired ? t("item.rx") : t("item.otc")}
                             icon={item.prescriptionRequired ? "pi pi-lock" : "pi pi-unlock"}
                             severity={item.prescriptionRequired ? "info" : "success"}
                             rounded
                        />
                    </div>
                </div>

                <aside className="tei-right">
                    <div className="price-lg">
                        {priceFormatted} <span className="currency">LEI</span>
                    </div>
                    <div className="stock-row">
                        <span className={outOfStock ? "out-of-stock" : "in-stock"}>
                                {outOfStock ? t("item.outOfStock") : t("item.inStock")}
                        </span>
                        <span className="updated">{t("item.updatedToday")}</span>
                    </div>

                    <div className="qty-row">
                        <label htmlFor="qty">{t("item.quantity")}</label>
                        <div className="qty-box">
                            <Button
                                icon="pi pi-minus"
                                className="qty-btn"
                                onClick={dec}
                                text
                            />
                            <InputText
                                value={qty}
                                readOnly
                                className="qty-input"
                            />
                            <Button
                                icon="pi pi-plus"
                                className="qty-btn"
                                onClick={inc}
                                text
                            />
                        </div>
                    </div>

                    {!outOfStock && (
                        <>
                            <ReserveButton quantity={qty}/>

                            {/* --- NEW ADD TO CART BUTTON --- */}
                            <Button
                                label={t("item.addToCart")}
                                className="add-to-cart-btn"
                                onClick={addToCart}
                            />
                        </>
                    )}

                    {outOfStock && (
                        <div className="notify-box">
                            <h3 className="notify-title">
                                {t("item.notifyWhenInStock")}
                            </h3>

                            {!subscribed ? (
                                <>
                                    <div className="notify-form">
                                        <InputText
                                            type="email"
                                            className="notify-input"
                                            placeholder={t("item.notifyEmailPlaceholder")}
                                            value={notifyEmail}
                                            onChange={(e) =>
                                                setNotifyEmail(e.target.value)
                                            }
                                        />

                                        <Button
                                            className="notify-btn"
                                            type="button"
                                            onClick={handleNotifySubscribe}
                                            label={t("item.notifySubscribe")}
                                        />
                                    </div>
                                    {notifyError && (
                                        <p className="notify-error">
                                            {notifyError}
                                        </p>
                                    )}
                                </>
                            ) : (
                                <Button className="notify-btn subscribed"
                                        type="button"
                                        disabled
                                        icon="pi pi-check"
                                        label={t("item.subscribed")}
                                />
                            )}
                        </div>
                    )}
                </aside>
            </div>

            <div className="tei-tabs">
                <TabView>
                    <TabPanel header={t("item.tabs.desc")}>
                        <h3>{tt("name", item.name)}</h3>
                        <p className="lead">{tt("description", item.description)}</p>

                        <h4>{t("item.adverseReactions")}</h4>
                        <p>{tt("sideEffects", item.sideEffects)}</p>

                        <h4>{t("item.productData")}</h4>
                        <ul className="bullets">
                            <li>
                                <b>{t("item.manufactured")}:</b> {item.manufacturingDate}
                            </li>
                            <li>
                                <b>{t("item.expires")}:</b> {item.expirationDate}
                            </li>
                            <li>
                                <b>{t("item.prescriptionRequired")}:</b>{" "}
                                {item.prescriptionRequired
                                    ? t("item.prescriptionRequired")
                                    : t("item.noPrescription")}
                            </li>
                        </ul>
                    </TabPanel>

                    <TabPanel header={t("item.tabs.spec")}>
                        <ul className="bullets">
                            <li>
                                <b>{t("item.brand")}:</b> {item.brand}
                            </li>
                            <li>
                                <b>{t("item.category")}:</b>{" "}
                                {t(`item.categories.${item.category}`, { defaultValue: item.category })}
                            </li>
                            <li>
                                <b>{t("item.productCode")}:</b> {item.id}
                            </li>
                        </ul>
                    </TabPanel>

                    <TabPanel header={t("item.tabs.info")}>
                        <p>{t("item.generalInfo")}</p>
                    </TabPanel>

                    <TabPanel header={t("item.tabs.prospect")}>
                        <p>{tt("prospectInfo", t("item.prospectInfo"))}</p>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
}