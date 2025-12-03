import { useTranslation } from "react-i18next";

import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
    const { t } = useTranslation();

    return (
        <div className="not-found">
            <div className="not-found__content">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__message">{t("notFound.message")}</p>
                <Link to="/" className="not-found__link">
                    {t("notFound.goHome")}
                </Link>
            </div>
        </div>
    );
}