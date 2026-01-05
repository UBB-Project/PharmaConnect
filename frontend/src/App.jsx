import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SimpleSlider from "./components/Carousel/SimpleSlider.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import ChatBot from "./components/ChatBot.jsx";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";
import MiniMapWidget from "./components/Map/MiniMapWidget.jsx";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemsList from "./components/ItemsList/ItemsList.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";
import { useState, useRef } from "react";

function App() {
    const { t } = useTranslation("home");

    const [showChatBot, setShowChatBot] = useState(false);
    const toggleChatBot = () => setShowChatBot(prev => !prev);

    const chatRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

    const startDrag = (e) => {
        const rect = chatRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", stopDrag);
    };

    const onDrag = (e) => {
        chatRef.current.style.left = `${e.clientX - offset.current.x}px`;
        chatRef.current.style.top = `${e.clientY - offset.current.y}px`;
        chatRef.current.style.bottom = "auto";
        chatRef.current.style.right = "auto";
    };

    const stopDrag = () => {
        document.removeEventListener("mousemove", onDrag);
        document.removeEventListener("mouseup", stopDrag);
    };

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

            {showChatBot && (
                <div className="floating-chatbot" ref={chatRef}>
                    <div className="chatbot-header" onMouseDown={startDrag}>
                        <span>
                            <i className="bi bi-robot me-2"></i>
                            Medical Assistant
                        </span>
                        <button className="close-chatbot" onClick={toggleChatBot}>
                            &times;
                        </button>
                    </div>

                    <div className="chatbot-body">
                        <ChatBot />
                    </div>
                </div>
            )}

            <style>
                {`
                .floating-chatbot {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    width: 520px;
                    height: 720px;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 12px 28px rgba(0,0,0,0.25);
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                }

                .chatbot-header {
                    background: linear-gradient(135deg, #00c6a7, #2575fc);
                    color: white;
                    padding: 10px 14px;
                    cursor: grab;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 600;
                    border-top-left-radius: 16px;
                    border-top-right-radius: 16px;
                }

                .chatbot-header:active {
                    cursor: grabbing;
                }

                .close-chatbot {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 1.6rem;
                    cursor: pointer;
                }

                .chatbot-body {
                    flex: 1;
                    overflow: hidden;
                }
                `}
            </style>
        </div>
    );
}

export default App;
