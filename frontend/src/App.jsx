import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";

// Components
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SimpleSlider from "./components/Carousel/SimpleSlider.jsx";
import MiniMapWidget from "./components/Map/MiniMapWidget.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import ItemsList from "./components/ItemsList/ItemsList.jsx";
import Popup from "./components/ChatBot/Popup/CBPopup.jsx";

// Pages
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

// Styles
import "./App.css";
import "leaflet/dist/leaflet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    const { t } = useTranslation("home");

    const [showChatBot, setShowChatBot] = useState(false);
    const toggleChatBot = () => setShowChatBot((prev) => !prev);

    return (
        <div className="app-container">
            <Header />

            <main className="content-wrapper">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="home-container">
                                <h1 className="home-title">{t("home.welcome")}</h1>
                                <p className="home-tagline">{t("home.tagline")}</p>

                                <div className="home-actions-container">
                                    <div className="mini-map-section">
                                        <h3 className="mini-map-title">
                                            <i className="pi pi-map"></i>
                                            {t("home.miniMapTitle") || "Find Pharmacies Near You"}
                                        </h3>
                                        <Link to="/map" className="no-underline">
                                            <MiniMapWidget />
                                        </Link>
                                    </div>

                                    <div className="chatbot-section">
                                        <Button
                                            label={t("home.openChatBot")}
                                            icon="pi pi-comments"
                                            size="large"
                                            className="super-btn-primary"
                                            rounded
                                            outlined
                                            onClick={toggleChatBot}
                                        />
                                    </div>

                                    <Link to="/items" style={{ textDecoration: "none" }}>
                                        <Button
                                            label={t("home.openItemsList")}
                                            icon="pi pi-shopping-cart"
                                            size="large"
                                            className="super-btn-primary"
                                            rounded
                                        />
                                    </Link>
                                </div>

                                <SimpleSlider />
                            </div>
                        }
                    />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/items" element={<ItemsList />} />
                    <Route path="/items/:id" element={<ItemPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />

            <Popup
                isOpen={showChatBot}
                onClose={toggleChatBot}
                title="Medical Assistant"
                icon="bi bi-robot"
            >
                <ChatBot />
            </Popup>
        </div>
    );
}

export default App;