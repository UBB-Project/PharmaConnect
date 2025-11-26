import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./ItemsList.css";
import { useTranslation } from "react-i18next";
import { Dropdown } from 'primereact/dropdown';

/**
 * @typedef {import('react-i18next').TFunction} TFunction
 */

export default function ItemsList() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [prescriptionFilter, setPrescriptionFilter] = useState("");
    const [sortBy, setSortBy] = useState("");

    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableBrands, setAvailableBrands] = useState([]);

    const API_BASE = "http://localhost:8080/api/items";

    const {t} = useTranslation();

    const buildApiUrl = () => {
        const params = new URLSearchParams();

        if (searchTerm) params.append("search", searchTerm);
        if (categoryFilter) params.append("category", categoryFilter);
        if (brandFilter) params.append("brand", brandFilter);

        if (prescriptionFilter === "required") params.append("prescription", true);
        if (prescriptionFilter === "not-required") params.append("prescription", false);

        if (sortBy) params.append("sort", sortBy);

        return `${API_BASE}?${params.toString()}`;
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const url = buildApiUrl();
                const res = await fetch(url);

                if (!res.ok) {
                    setError("Could not load items.");
                    return;
                }

                const data = await res.json();
                setProducts(data);
                setAvailableCategories([...new Set(data.map((p) => p.category))]);
                setAvailableBrands([...new Set(data.map((p) => p.brand))]);

            } catch (err) {
                console.error(err);
                setError("Could not load items.");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, categoryFilter, brandFilter, prescriptionFilter, sortBy]);


    const sortOptions = [
        {
            label: t("itemsList.priceLow"),
            value: "priceLowHigh",
            icon: "pi pi-sort-amount-up-alt"
        },
        {
            label: t("itemsList.priceHigh"),
            value: "priceHighLow",
            icon: "pi pi-sort-amount-down"
        },
        {
            label: t("itemsList.nameAsc"),
            value: "nameAZ",
            icon: "pi pi-sort-alpha-down"
        },
        {
            label: t("itemsList.nameDesc"),
            value: "nameZA",
            icon: "pi pi-sort-alpha-up-alt"
        },
        {
            label: t("itemsList.brandAsc"),
            value: "brandAZ",
            icon: "pi pi-sort-alpha-down"
        },
        {
            label: t("itemsList.brandDesc"),
            value: "brandZA",
            icon: "pi pi-sort-alpha-up-alt"
        }
    ];

    const optionTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-2">
                <i className={option.icon}></i>
                <span>{option.label}</span>
            </div>
        );
    };

    const clearAllFilters = () => {
        setSearchTerm("");
        setCategoryFilter("");
        setBrandFilter("");
        setPrescriptionFilter("");
        setSortBy("");
    };

    return (
        <div className="items-list-container">
            <h2 className="list-title">{t("itemsList.title")}</h2>
            <div className="sticky-bar">
                <input
                    type="text"
                    placeholder={t("itemsList.searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="">{t("itemsList.allCategories")}</option>
                    {availableCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <select
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="">{t("itemsList.allBrands")}</option>
                    {availableBrands.map((brand) => (
                        <option key={brand} value={brand}>
                            {brand}
                        </option>
                    ))}
                </select>

                <select
                    value={prescriptionFilter}
                    onChange={(e) => setPrescriptionFilter(e.target.value)}
                    className="filter-select"
                >
                    <option value="">{t("itemsList.allProducts")}</option>
                    <option value="required">{t("itemsList.prescriptionRequired")}</option>
                    <option value="not-required">{t("itemsList.overTheCounter")}</option>
                </select>

                <Dropdown
                    value={sortBy}
                    onChange={(e) => setSortBy(e.value)}
                    options={sortOptions}
                    optionLabel="label"
                    placeholder={t("itemsList.sortBy")}
                    itemTemplate={optionTemplate}
                    className="filter-select"
                    panelClassName="filter-select-panel"
                />
                <button className="clear-btn" onClick={clearAllFilters}>
                    {t("itemsList.clearAll")}
                </button>
            </div>

            {loading && (
                <div className="status-message loading">
                    {t("itemsList.loading") || "Loading..."}
                </div>
            )}

            {error && (
                <div className="status-message error">
                    {error}
                </div>
            )}

            <div className="product-grid">
                {products.length === 0 && !loading ? (
                    <p className="no-results">{t("itemsList.noResults")}</p>
                ) : (
                    products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/items/${product.id}`}
                            style={{ textDecoration: "none" }}
                        >
                            <ProductCard product={product} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}
