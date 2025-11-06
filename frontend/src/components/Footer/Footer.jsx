import React from "react";
import "./Footer.css";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <p>© 2025 PharmaConnect. All rights reserved.</p>
            <a
                href="https://github.com/UBB-Project/PharmaConnect"
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
                aria-label="PharmaConnect GitHub Repository"
            >
                <FaGithub size={18} />
            </a>
        </footer>
    );
}
