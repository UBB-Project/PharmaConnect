import React from "react";
import Slider from "react-slick";
import "./SimpleSlider.css";

function SimpleSlider() {
    const slidesData = [
        // Updated data to include image URLs and titles
        { title: "PainRelief 500", imgUrl: "https://m.media-amazon.com/images/I/61grcfYAnAL._AC_SL1000_.jpg" },
        { title: "Vitamin C 1000", imgUrl: "https://gymbeam.ro/media/catalog/product/cache/70f742f66feec18cb83790f14444a3d1/v/i/vitamic_c_1000_mg_30_tabs_gymbeam.png" },
        { title: "AllergyStop", imgUrl: "https://aronia-charlottenburg.ro/wp-content/uploads/2025/08/1080x1080_allergy_28.07.2025.jpg" },
        { title: "Omega 3 Fish Oil", imgUrl: "https://gymbeam.ro/media/catalog/product/cache/70f742f66feec18cb83790f14444a3d1/u/n/untitled_design_2__5.png" },
        { title: "Cough Relief Syrup", imgUrl: "https://www.medisei.gr/801-thickbox_default/cough-relief-syrup.jpg" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        slidesToScroll: 2,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {slidesData.map((slide, index) => (
                    <div key={index}>
                        <div className="slide-item">
                            {/* Image element added */}
                            <img
                                src={slide.imgUrl}
                                alt={slide.title}
                                className="slide-image"
                                // Fallback for image loading error
                                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/e5e7eb/6b7280?text=Error" }}
                            />
                            {/* Title underneath the image */}
                            <h3 className="slide-title">{slide.title}</h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SimpleSlider;