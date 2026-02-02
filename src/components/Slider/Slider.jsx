import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll"; // Импортируем нужный плагин
import { catImages } from "./config";
import "./Slider.css";
import { useMemo } from "react";

export default function SimpleSlider() {
  const options = useMemo(
    () => ({
      loop: true,
      align: "start",
    }),
    [],
  );

  const autoScrollOptions = useMemo(
    () =>
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    [],
  );

  const [emblaRef] = useEmblaCarousel(options, [autoScrollOptions]);

  return (
    <div className="embla" style={{ marginBottom: "40px" }} ref={emblaRef}>
      <div className="embla__container slider__container">
        {catImages.map((image, index) => (
          <div className="embla__slide" key={`${image}-${index}`}>
            <div className="slider__item">
              <img
                loading="lazy"
                decoding="async"
                src={image}
                alt={`Cat ${index}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
