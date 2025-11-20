import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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

            <p
                className={`product-prescription ${
                    product.prescriptionRequired ? "required" : "not-required"
                }`}
            >
                {product.prescriptionRequired ?
                    t("item.rx") : t("item.otc")}
            </p>
        </div>
    );
}
