import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useTranslation } from "react-i18next";

export default function NavBar() {
    const { t } = useTranslation();

    return (
        <nav className="nav-bar">
            <NavLink to="/" className="nav-button">
                {t("nav.home")}
            </NavLink>

            <NavLink to="/map" className="nav-button">
                {t("nav.map")}
            </NavLink>

            <NavLink to="/items" className="nav-button">
                {t("nav.items")}
            </NavLink>
        </nav>
    );
}
