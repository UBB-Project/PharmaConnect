import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./SimpleSlider.css";

const API_BASE = "http://localhost:8080/api";

function SimpleSlider() {
    const [slidesData, setSlidesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch(`${API_BASE}/items`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();

                const mapped = data.map(item => ({
                    id: item.id,
                    title: item.name,
                    imgUrl: item.imageUrl
                }));

                setSlidesData(mapped);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        slidesToScroll: 2,
    };

    const handleItemClick = (itemId) => {
        if (!itemId) return;
        navigate(`/items/${itemId}`);
    };

    if (loading) return <div style={{ color: "white" }}>Loading...</div>;
    if (error) return <div style={{ color: "red" }}>{error}</div>;

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {slidesData.map((slide) => (
                    <div
                        key={slide.id}
                        onClick={() => handleItemClick(slide.id)}
                        className="cursor-pointer-wrapper"
                    >
                        <div className="slide-item">
                            <img
                                src={slide.imgUrl}
                                alt={slide.title}
                                className="slide-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/300x200/e5e7eb/6b7280?text=Error";
                                }}
                            />
                            <h3 className="slide-title">{slide.title}</h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SimpleSlider;
