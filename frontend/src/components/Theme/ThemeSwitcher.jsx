import React, { useState, useEffect } from "react";
import { InputSwitch } from "primereact/inputswitch";

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });

    const handleToggle = (e) => {
        setIsDarkMode(e.value);
    };

    useEffect(() => {
        const theme = isDarkMode ? "lara-dark-teal" : "lara-light-teal";

        const existingLink = document.getElementById("app-theme");
        if (existingLink) {
            existingLink.remove();
        }

        const link = document.createElement("link");
        link.id = "app-theme";
        link.rel = "stylesheet";
        link.href = `/themes/${theme}/theme.css`;
        document.head.appendChild(link);

        if (isDarkMode) {
            document.body.classList.add('app-dark');
        } else {
            document.body.classList.remove('app-dark');
        }
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    return (
        <div className="flex align-items-center gap-2 mx-2">
            <i
                className={`pi ${isDarkMode ? "pi-moon" : "pi-sun"}`}
                style={{ fontSize: "1.2rem", color: "white" }}
            ></i>
            <InputSwitch
                checked={isDarkMode}
                onChange={handleToggle}
                aria-label="Toggle Dark Mode"
            />
        </div>
    );
};

export default ThemeSwitcher;
