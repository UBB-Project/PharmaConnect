import {Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SimpleSlider from "./components/Carousel/SimpleSlider.jsx";
import MapPage from "./pages/MapPage/MapPage.jsx";
import "./App.css";
import "leaflet/dist/leaflet.css";
import {useTranslation} from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ItemPage from "./pages/ItemPage/ItemPage.jsx";
import ItemsList from "./components/ItemsList/ItemsList.jsx";
import NavBar from "./NavBar/NavBar.jsx";

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
                                <SimpleSlider />
                            </div>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
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
