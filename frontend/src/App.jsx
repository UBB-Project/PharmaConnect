import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import "./App.css";
import {useTranslation} from "react-i18next";

function App() {
    const { t } = useTranslation("home");
    return (
        <div className="app-container">
            <Header />

            <main className="content-wrapper">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="home-page">
                                <h1>{t("home.welcome")}</h1>
                                <p>{t("home.tagline")}</p>
                            </div>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;
