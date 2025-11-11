import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./LoginPage.css";

export default function LoginPage() {
    const { t } = useTranslation("login");
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("login"); // default to login
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [pointer, setPointer] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            setPointer({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const parallax = useCallback(
        (depth = 20) => {
            const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
            const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
            const tx = ((pointer.x - cx) / cx) * depth;
            const ty = ((pointer.y - cy) / cy) * depth;
            return { x: tx, y: ty };
        },
        [pointer]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSuccess(true);
            setIsSubmitting(false);
            setTimeout(() => navigate("/"), 700);
        }, 900);
    };

    const tabUnderlineLayoutId = useMemo(() => "tab-underline", []);

    return (
        <div className="login-page" role="main" aria-labelledby="auth-title">
            {/* Animated full-bleed background */}
            <motion.div className="auth-bg" aria-hidden="true">
                <div className="gradient-layer" />
                <motion.div
                    className="blob blob1"
                    animate={{ x: parallax(30).x, y: parallax(30).y }}
                    transition={{ type: "spring", stiffness: 30, damping: 20 }}
                />
                <motion.div
                    className="blob blob2"
                    animate={{ x: parallax(-20).x, y: parallax(-20).y }}
                    transition={{ type: "spring", stiffness: 25, damping: 18 }}
                />
                <motion.div
                    className="blob blob3"
                    animate={{ x: parallax(10).x, y: parallax(10).y }}
                    transition={{ type: "spring", stiffness: 35, damping: 22 }}
                />
            </motion.div>

            <div className="login-container">
                <motion.div
                    className="auth-card"
                    initial={{ y: 24, opacity: 0, scale: 0.98 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                >
                    <h2 id="auth-title" className="visually-hidden">{t("login.loginTitle")}</h2>

                    <div className="tabs" role="tablist" aria-label="Authentication options">
                        <button
                            role="tab"
                            aria-selected={activeTab === "login"}
                            className={`tab ${activeTab === "login" ? "active" : ""}`}
                            onClick={() => setActiveTab("login")}
                        >
                            {t("login.tabLogin")}
                            {activeTab === "login" && (
                                <motion.span
                                    className="tab-underline"
                                    layoutId={tabUnderlineLayoutId}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                        <button
                            role="tab"
                            aria-selected={activeTab === "register"}
                            className={`tab ${activeTab === "register" ? "active" : ""}`}
                            onClick={() => setActiveTab("register")}
                        >
                            {t("login.tabRegister")}
                            {activeTab === "register" && (
                                <motion.span
                                    className="tab-underline"
                                    layoutId={tabUnderlineLayoutId}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </button>
                    </div>

                    <div className="form-viewport">
                        <AnimatePresence mode="wait">
                            {activeTab === "login" ? (
                                <motion.form
                                    key="login-form"
                                    className="auth-form"
                                    onSubmit={handleSubmit}
                                    aria-label="Login form"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.28 }}
                                >
                                    <div className="form-group float">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder=" "
                                            required
                                            aria-required="true"
                                            autoComplete="email"
                                        />
                                        <label htmlFor="email">{t("login.email")}</label>
                                    </div>
                                    <div className="form-group float">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder=" "
                                            required
                                            aria-required="true"
                                            autoComplete="current-password"
                                        />
                                        <label htmlFor="password">{t("login.password")}</label>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className={`submit-btn ${isSubmitting ? "loading" : ""} ${isSuccess ? "success" : ""}`}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting || isSuccess}
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {!isSubmitting && !isSuccess && (
                                                <motion.span
                                                    key="btn-text-login"
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -6 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {t("login.loginButton")}
                                                </motion.span>
                                            )}
                                            {isSubmitting && (
                                                <motion.span
                                                    key="btn-loading-login"
                                                    className="spinner"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                            {isSuccess && (
                                                <motion.span
                                                    key="btn-success-login"
                                                    className="checkmark"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                >
                                                    ✓
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="register-form"
                                    className="auth-form"
                                    onSubmit={handleSubmit}
                                    aria-label="Register form"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.28 }}
                                >
                                    <div className="form-group float">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            placeholder=" "
                                            required
                                            aria-required="true"
                                            autoComplete="given-name"
                                        />
                                        <label htmlFor="firstName">{t("login.firstName")}</label>
                                    </div>
                                    <div className="form-group float">
                                        <input
                                            id="secondName"
                                            name="secondName"
                                            type="text"
                                            placeholder=" "
                                            autoComplete="additional-name"
                                        />
                                        <label htmlFor="secondName">{t("login.secondName")}</label>
                                    </div>
                                    <div className="form-group float">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            placeholder=" "
                                            required
                                            aria-required="true"
                                            autoComplete="family-name"
                                        />
                                        <label htmlFor="lastName">{t("login.lastName")}</label>
                                    </div>
                                    <motion.button
                                        type="submit"
                                        className={`submit-btn ${isSubmitting ? "loading" : ""} ${isSuccess ? "success" : ""}`}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isSubmitting || isSuccess}
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            {!isSubmitting && !isSuccess && (
                                                <motion.span
                                                    key="btn-text-register"
                                                    initial={{ opacity: 0, y: 6 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -6 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {t("login.registerButton")}
                                                </motion.span>
                                            )}
                                            {isSubmitting && (
                                                <motion.span
                                                    key="btn-loading-register"
                                                    className="spinner"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                />
                                            )}
                                            {isSuccess && (
                                                <motion.span
                                                    key="btn-success-register"
                                                    className="checkmark"
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                >
                                                    ✓
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
