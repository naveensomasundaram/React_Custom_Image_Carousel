import React, { useState } from "react";
import carouselDirection, { defaultTimeInSeconds } from "../config/Config";

function InputWrapper({
  selectedCarouselDirection,
  updatedCarouselDuration,
  updateCarouselConfigurations,
}) {
  const [currentCarouselDirection, updateCurrentCarouselDirection] = useState(
    selectedCarouselDirection
  );
  const [currentCarouselDuration, updateCurrentCarouselDuration] = useState(
    updatedCarouselDuration
  );

  const onCarouselDirectionChange = (selectedDirection) =>
    updateCurrentCarouselDirection(selectedDirection);

  const onDurationChange = (event) =>
    updateCurrentCarouselDuration(event.target.value);

  return (
    <div className="inputWrapper">
      <div className="durationWrapper">
        <p>
          Duration:
          <input
            type="text"
            id="carouselDuration"
            name="carouselDuration"
            placeholder="Enter Duration in Seconds"
            value={currentCarouselDuration}
            onChange={(e) => onDurationChange(e)}
          />
        </p>
      </div>
      <div className="directionWrapper">
        <p>
          Direction:
          <input
            type="radio"
            id={carouselDirection.Forward}
            name="carousel_direction"
            checked={currentCarouselDirection === carouselDirection.Forward}
            value={currentCarouselDirection}
            onChange={() =>
              onCarouselDirectionChange(carouselDirection.Forward)
            }
          />
            <label>{carouselDirection.Forward}</label>
          <input
            type="radio"
            id={carouselDirection.Reverse}
            name="carousel_direction"
            checked={currentCarouselDirection === carouselDirection.Reverse}
            value={currentCarouselDirection}
            onChange={() =>
              onCarouselDirectionChange(carouselDirection.Reverse)
            }
          />
            <label>{carouselDirection.Reverse}</label>
        </p>
        <br />
      </div>
      <button
        type="button"
        onClick={() =>
          updateCarouselConfigurations(
            currentCarouselDuration,
            currentCarouselDirection
          )
        }
      >
        Submit
      </button>
    </div>
  );
}

export default InputWrapper;
