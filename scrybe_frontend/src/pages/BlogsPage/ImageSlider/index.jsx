import React from "react";
import "./style.scss";

function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slideStyle = {
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
    transition: `all ${0.4}s ease`,
  };

  const goToPrev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const goToSlide = (i) => {
    setCurrentIndex(i);
  };

  return (
    <div className="sliderStyles">
      <div className="rightArrowStyles" onClick={goToNext}>
        ❯
      </div>
      <div className="leftArrowStyles" onClick={goToPrev}>
        ❮
      </div>

      <div style={slideStyle} className="slideStyle"></div>
      <div className="dot-container">
        {slides.map((_, i) => (
          <div
            key={i + 1}
            onClick={() => goToSlide(i)}
            className={`dot ${currentIndex === i ? "activeSlide" : ""}`}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
