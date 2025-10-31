import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import "./Home.css";

export default function Home() {
    return (
        <div className="page">
            <Navbar />
            <main className="hero">
                <h1>Welcome to PharmaConnect</h1>
                <p className="sub">
                    Find nearby pharmacies, manage your meds, and stay on schedule.
                </p>
                <div className="cta">
                    <Link className="btn btn-primary" to="/map">Open Map</Link>
                    {/* add later when pages exist:
          <Link className="btn" to="/medicines">My Medicines</Link>
          <Link className="btn" to="/schedule">My Schedule</Link> */}
                </div>
            </main>
        </div>
    );
}