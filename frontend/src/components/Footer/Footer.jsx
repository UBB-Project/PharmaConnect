import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    const { t } = useTranslation("footer");

    return (
        <footer className="footer">
            <p className="footer-text">{t("footer.copyright")}</p>
            <a
                href="https://github.com/UBB-Project/PharmaConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
                aria-label={t("footer.github")}
            >
                <FaGithub size={16} />
            </a>
        </footer>
    );
}
