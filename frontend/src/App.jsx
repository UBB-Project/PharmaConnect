import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage.jsx";
import "./App.css";

function App() {
    return (
        <div className="app-container">
            <Header />

            <main className="content-wrapper">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div className="home-page">
                                <h1>Welcome to PharmaConnect!</h1>
                                <p>Your trusted partner in digital healthcare.</p>
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
