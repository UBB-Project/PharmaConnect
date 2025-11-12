import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ItemPage.css";

const API_BASE = "http://localhost:8080/api";

export default function ItemPage() {
    const { id } = useParams();
    const { t, i18n } = useTranslation();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tab, setTab] = useState("desc");
    const [reserved, setReserved] = useState(false);
    const [qty, setQty] = useState(1);

    const inc = () => setQty((q) => q + 1);
    const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

    useEffect(() => {
        const load = async () => {
            try {
                const r = await fetch(`${API_BASE}/items/${id}`);
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const data = await r.json();
                setItem(data);
            } catch {
                setError(t("item.error"));
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, i18n.language]);

    if (loading) return <div className="container">{t("item.loading")}</div>;
    if (error) return <div className="container error">{error}</div>;
    if (!item) return null;

    const reserve = () => {
        setReserved(true);
        setTimeout(() => setReserved(false), 2000);
    };

    const priceFormatted =
        typeof item.price === "number"
            ? new Intl.NumberFormat(i18n.language, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(item.price)
            : item.price;

    const tt = (field, fallback) =>
        t(`item.products.${id}.${field}`, { defaultValue: fallback });

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
            <span className="badge badge-green">
              {item.prescriptionRequired ? t("item.rx") : t("item.otc")}
            </span>
                    </div>
                </div>

                <aside className="tei-right">
                    <div className="price-lg">
                        {priceFormatted} <span className="currency">LEI</span>
                    </div>
                    <div className="stock-row">
                        <span className="in-stock">{t("item.inStock")}</span>
                        <span className="updated">{t("item.updatedToday")}</span>
                    </div>

                    <div className="qty-row">
                        <label htmlFor="qty">{t("item.quantity")}</label>
                        <div className="qty-box">
                            <button type="button" onClick={dec}>
                                −
                            </button>
                            <input
                                id="qty"
                                value={qty}
                                readOnly
                                aria-label={t("item.quantity")}
                            />
                            <button type="button" onClick={inc}>
                                +
                            </button>
                        </div>
                    </div>

                    <button className="btn-green" onClick={reserve} disabled={reserved}>
                        {reserved ? t("item.reserved") : t("item.reserve")}
                    </button>
                </aside>
            </div>

            <div className="tei-tabs">
                <div className="tab-bar" role="tablist" aria-label="Product details">
                    <button
                        className={`tab ${tab === "desc" ? "active" : ""}`}
                        onClick={() => setTab("desc")}
                        role="tab"
                    >
                        {t("item.tabs.desc")}
                    </button>
                    <button
                        className={`tab ${tab === "spec" ? "active" : ""}`}
                        onClick={() => setTab("spec")}
                        role="tab"
                    >
                        {t("item.tabs.spec")}
                    </button>
                    <button
                        className={`tab ${tab === "info" ? "active" : ""}`}
                        onClick={() => setTab("info")}
                        role="tab"
                    >
                        {t("item.tabs.info")}
                    </button>
                    <button
                        className={`tab ${tab === "prospect" ? "active" : ""}`}
                        onClick={() => setTab("prospect")}
                        role="tab"
                    >
                        {t("item.tabs.prospect")}
                    </button>
                </div>

                <div className="tab-panel">
                    {tab === "desc" && (
                        <>
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
                        </>
                    )}

                    {tab === "spec" && (
                        <ul className="bullets">
                            <li>
                                <b>{t("item.brand")}:</b> {item.brand}
                            </li>
                            <li>
                                <b>{t("item.category")}:</b> {t(`item.categories.${item.category}`, { defaultValue: item.category })}
                            </li>
                            <li>
                                <b>{t("item.productCode")}:</b> {item.id}
                            </li>
                        </ul>
                    )}

                    {tab === "info" && <p>{t("item.generalInfo")}</p>}

                    {tab === "prospect" && (
                        <p>{tt("prospectInfo", t("item.prospectInfo"))}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
