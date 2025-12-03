import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tag } from "primereact/tag";

export default function ProductCard({ product }) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div
            className="product-card"
            onClick={() => navigate(`/items/${product.id}`)}
        >
            <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
            />

            <div className="product-name">{product.name}</div>
            <div className="product-brand">{product.brand}</div>

            <Tag
                value={product.prescriptionRequired ? t("item.rx") : t("item.otc")}
                icon={product.prescriptionRequired ? "pi pi-lock" : "pi pi-unlock"}
                severity={product.prescriptionRequired ? "info" : "success"}
                className="product-tag"
                rounded
            />
        </div>
    );
}
