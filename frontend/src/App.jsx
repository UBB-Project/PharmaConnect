import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import MapPage from "./pages/Map/MapPage.jsx";
import "./App.css";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<MapPage />} />
            </Routes>
        </BrowserRouter>
    );
}