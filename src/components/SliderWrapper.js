import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import uuid from "react-uuid";
import carouselDirection, { defaultTimeInSeconds } from "../config/Config";

export const SlideImage = styled.img`
  width: 400px;
  height: 400px;
  object-fit: cover;
  src: ${(props) => (props.src ? props.src : "")};
`;

export const StyledSlider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SliderWrapper({
  sliderImages,
  selectedCarouselDirection,
  updatedCarouselDuration,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = sliderImages?.length;
  const [time, setTime] = useState(updatedCarouselDuration);

  useEffect(() => {
    const countdown = window.setInterval(() => {
      setTime((timeRemaining) => {
        if (timeRemaining - 1 < 0) {
          setCurrentSlide((prevSlide) => {
            return selectedCarouselDirection === carouselDirection.Forward
              ? prevSlide === length - 1
                ? 0
                : prevSlide + 1
              : prevSlide === length - 1
              ? 0
              : prevSlide - 1;
          });
          return updatedCarouselDuration;
        } else {
          return timeRemaining - 1;
        }
      });
    }, updatedCarouselDuration * 1000);

    return () => {
      window.clearInterval(countdown);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
    setTime(updatedCarouselDuration);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
    setTime(updatedCarouselDuration);
  };

  return (
    <StyledSlider>
      <FaChevronLeft className="leftArrow" onClick={prevSlide} />
      {sliderImages?.map((slide, index) => {
        return (
          <div key={uuid()}>
            {index === currentSlide && (
              <SlideImage src={slide} alt="Carousel Image" />
            )}
          </div>
        );
      })}
      <FaChevronRight className="rightArrow" onClick={nextSlide} />
    </StyledSlider>
  );
}

export default SliderWrapper;
