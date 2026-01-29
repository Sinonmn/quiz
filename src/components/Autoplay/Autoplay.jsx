import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Autoplay.css";
import { useEffect } from "react";

function AutoPlay() {
  const catImages = import.meta.glob("../../assets/сatsPictures/*.jpg", {
    eager: true,
  });

  const imagesArray = Object.values(catImages).map((module) => module.default);

  useEffect(() => {
    imagesArray.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [imagesArray]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {imagesArray.map((url, index) => (
          <div key={index} style={{ padding: "10px" }}>
            <img
              src={url}
              alt={`Cat ${index + 1}`}
              style={{
                position: "relative",
                zIndex: "-1",
                width: "60%",
                height: "300px",
                borderRadius: "8px",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
