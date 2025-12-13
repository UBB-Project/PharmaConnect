import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SimpleSlider from "./components/Carousel/SimpleSlider.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import ChatBot from "./components/ChatBot.jsx";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";
import MiniMapWidget from "./components/Map/MiniMapWidget.jsx";
import { Button } from 'primereact/button';
import { useTranslation } from "react-i18next";
import "./App.css";
import "leaflet/dist/leaflet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemsList from "./components/ItemsList/ItemsList.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import CartPage from "./pages/CartPage/CartPage.jsx";

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
                                <div className="home-container">
                                    <h1 className="home-title">{t("home.welcome")}</h1>
                                    <p className="home-tagline">{t("home.tagline")}</p>

                                    {/* Horizontal Container for Map and ChatBot */}
                                    <div className="home-actions-container">

                                     {/* Left: Mini Map */}
                                     <div className="mini-map-section">
                                            <h3 className="mini-map-title">
                                                <i className="pi pi-map"></i>
                                                {t("home.miniMapTitle") || "Find Pharmacies Near You"}
                                            </h3>
                                            <Link to="/map" className="no-underline">
                                                <MiniMapWidget />
                                            </Link>
                                     </div>

                                    {/* Right: ChatBot Button */}
                                    <div className="chatbot-section">
                                        <Link to="/chatbot" className="no-underline">
                                            <Button
                                                label={t("home.openChatBot")}
                                                icon="pi pi-comments"
                                                size="large"
                                                className="super-btn-primary"
                                                rounded
                                                outlined
                                            />
                                        </Link>
                                    </div>
                                    <Link to="/items" style={{ textDecoration: 'none' }}>
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
                    <Route path="/chatbot" element={<ChatBot />} />
                    <Route path="/items" element={<ItemsList />} />
                    <Route path="/items/:id" element={<ItemPage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/cart" element={<CartPage />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>

            </main>

            <Footer />
        </div>
    );
}

export default App;