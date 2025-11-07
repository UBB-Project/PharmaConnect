import React from "react";
import { useTranslation } from "react-i18next";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    const { t } = useTranslation("footer");

    return (
        <footer className="footer">
            <p>{t("footer.copyright")}</p>
            <a
                href="https://github.com/UBB-Project/PharmaConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
                aria-label={t("footer.github")}
            >
                <FaGithub size={18} />
            </a>
        </footer>
    );
}
