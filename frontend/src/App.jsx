import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SimpleSlider from "./components/Carousel/SimpleSlider.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import "./App.css";
import ChatBot from "./components/ChatBot.jsx";
import "leaflet/dist/leaflet.css";
import {useTranslation} from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";
import ItemsList from "./components/ItemsList/ItemsList.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import { Button } from 'primereact/button';

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
                                <NavBar />
                                <h1>{t("home.welcome")}</h1>
                                <p>{t("home.tagline")}</p>
                                <p className="mb-4">{t("home.tagline")}</p>

                                <div className="flex gap-3 mt-3 mb-5 justify-content-center">

                                    <Link to="/map" style={{ textDecoration: 'none' }}>
                                        <Button
                                            label={t("home.openMap")}
                                            icon="pi pi-map"
                                            className="super-btn-primary"
                                            size="large"
                                            rounded
                                        />
                                    </Link>

                                    <Link to="/chatbot" style={{ textDecoration: 'none' }}>
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

                                <SimpleSlider />
                            </div>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/chatbot" element={<ChatBot />} />
                    <Route path="/items/:id" element={<ItemPage />} />
                    <Route path="/map" element={
                            <>
                                <NavBar />
                                <MapPage />
                            </>
                        }
                    />
                    <Route path="/items" element={
                            <>
                                <NavBar />
                                <ItemsList />
                            </>
                        }
                    />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;