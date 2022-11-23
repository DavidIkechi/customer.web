import React from "react";
import "./style.scss";

function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const sliderStyles = {
    height: "100%",
    position: "relative",
  };

  const slideStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${slides[currentIndex].url})`,
    transition: `all ${0.4}s ease`,
  };
  const leftArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
    backgroundColor: "#5e5c5c47",
    padding: "0 20px",
  };
  const rightArrowStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
    backgroundColor: "#5e5c5c47",
    padding: "0 20px",
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
    i.className = "activeSlide";
  };

  return (
    <div style={sliderStyles}>
      <div style={rightArrowStyles} onClick={goToNext}>
        ❯
      </div>
      <div style={leftArrowStyles} onClick={goToPrev}>
        ❮
      </div>
      <div style={slideStyle}></div>
      <div className="dot-container">
        {slides.map((_, i) => (
          <div key={i + 1} onClick={() => goToSlide(i)}>
            •
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
