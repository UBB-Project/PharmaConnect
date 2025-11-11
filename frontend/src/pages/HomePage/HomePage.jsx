import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./HomePage.css";

export default function HomePage() {
    const { t } = useTranslation("home");
    const navigate = useNavigate();

    const [pointer, setPointer] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => setPointer({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    const cx = typeof window !== "undefined" ? window.innerWidth / 2 : 0;
    const cy = typeof window !== "undefined" ? window.innerHeight / 2 : 0;
    const parallax = (depth = 16) => ({
        x: ((pointer.x - cx) / cx) * depth,
        y: ((pointer.y - cy) / cy) * depth
    });

    const features = useMemo(() => [
        {
            key: "listings",
            title: t("home.featureListingsTitle"),
            desc: t("home.featureListingsDesc")
        },
        {
            key: "inventory",
            title: t("home.featureInventoryTitle"),
            desc: t("home.featureInventoryDesc")
        },
        {
            key: "orders",
            title: t("home.featureOrdersTitle"),
            desc: t("home.featureOrdersDesc")
        }
    ], [t]);

    return (
        <div className="home-root" role="main" aria-label="PharmaConnect home">
            <motion.div className="home-bg" aria-hidden="true">
                <div className="home-gradient" />
                <motion.div
                    className="home-blob hb1"
                    animate={parallax(28)}
                    transition={{ type: "spring", stiffness: 28, damping: 20 }}
                />
                <motion.div
                    className="home-blob hb2"
                    animate={parallax(-18)}
                    transition={{ type: "spring", stiffness: 26, damping: 18 }}
                />
                <motion.div
                    className="home-blob hb3"
                    animate={parallax(10)}
                    transition={{ type: "spring", stiffness: 32, damping: 22 }}
                />
            </motion.div>

            <div className="home-page">
                <section className="hero">
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                        {t("home.heroTitle")}
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.05 }}
                    >
                        {t("home.heroSubtitle")}
                    </motion.p>
                    <div className="hero-cta-group">
                        <motion.button
                            className="hero-cta"
                            onClick={() => navigate("/login")}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t("home.ctaPrimary")}
                        </motion.button>
                        <motion.button
                            className="hero-cta secondary"
                            onClick={() => navigate("/login")}
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t("home.ctaSecondary")}
                        </motion.button>
                    </div>
                </section>

                <section className="features" aria-label="Key features">
                    <div className="features-grid">
                        {[
                            ...features,
                            { key: "trusted", title: t("home.featureTrustedTitle"), desc: t("home.featureTrustedDesc") },
                            { key: "delivery", title: t("home.featureDeliveryTitle"), desc: t("home.featureDeliveryDesc") },
                            { key: "secure", title: t("home.featureSecureTitle"), desc: t("home.featureSecureDesc") }
                        ].map((f, idx) => (
                            <motion.div
                                key={f.key}
                                className="feature-card"
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.45, delay: 0.06 * idx }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="feature-glow" />
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
