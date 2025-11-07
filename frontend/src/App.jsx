import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import "./App.css";
import ChatBot from "./components/ChatBot.jsx";

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
                    <Route path="/chatbot" element={<ChatBot />} />
                </Routes>
            </main>

            <Footer />
        </div>

    );
}

export default App;
