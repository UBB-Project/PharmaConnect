import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Navbar.css";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const onDown = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, []);

    return (
        <header className="navbar">
            {/* logo */}
            <div className="navbar__logo">
                <Link to="/" className="navbar__brand">PharmaConnect</Link>
            </div>

            {/* buttons */}
            <nav className="navbar__links">
                <NavLink to="/" end className="navlink">Home</NavLink>
                <NavLink to="/map" className="navlink">Map</NavLink>
                {/* will be added when ready:
        <NavLink to="/medicines" className="navlink">My Medicines</NavLink>
        <NavLink to="/schedule" className="navlink">Schedule</NavLink> */}
            </nav>
            {/* User button + menu */}
            <div className="navbar__user" ref={menuRef}>
                <button
                    className="user-button"
                    onClick={() => setMenuOpen((s) => !s)}
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    title="User menu"
                >
                    👤
                </button>
                {menuOpen && (
                    <div className="user-menu" role="menu">
                        <Link to="/profile" className="user-menu__item">Profile</Link>
                        <Link to="/settings" className="user-menu__item">Settings</Link>
                        <hr className="user-menu__sep" />
                        <button className="user-menu__item btn-link" onClick={() => alert("Logged out!")}>
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}