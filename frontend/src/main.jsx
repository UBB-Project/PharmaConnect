import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {BrowserRouter} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import "leaflet/dist/leaflet.css";
import i18n from "./i18n.js";
import "./index.css"


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <I18nextProvider i18n={i18n}>
                    <App />
                </I18nextProvider>
            </Suspense>
        </BrowserRouter>
    </React.StrictMode>
);
