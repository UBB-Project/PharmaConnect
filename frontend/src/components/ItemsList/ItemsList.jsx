import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import "./ItemsList.css";
import { useTranslation } from "react-i18next";

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
                    aria-label={t("itemsList.searchPlaceholder")}
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

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                >
                    <option value="">{t("itemsList.sortBy")}</option>
                    <option value="priceLowHigh">{t("itemsList.priceLow")}</option>
                    <option value="priceHighLow">{t("itemsList.priceHigh")}</option>
                    <option value="nameAZ">{t("itemsList.nameAsc")}</option>
                    <option value="nameZA">{t("itemsList.nameDesc")}</option>
                    <option value="brandAZ">{t("itemsList.brandAsc")}</option>
                    <option value="brandZA">{t("itemsList.brandDesc")}</option>
                </select>

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
