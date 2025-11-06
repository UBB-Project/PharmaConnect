import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: import.meta.env.MODE === "development",
        interpolation: { escapeValue: false },
        ns: ["common", "header", "footer", "login", "home"],
        defaultNS: "common",
        backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
            detection: {
                    lookupLocalStorage: "i18nextLng",
                    order: ["localStorage", "navigator"],
                    caches: ["localStorage"],
                    checkWhitelist: true,
                    lookupFromPathIndex: 0,
                    lookupFromSubdomainIndex: 0,
                    languageOnly: true
            },
            react: { useSuspense: true }
    });

export default i18n;
