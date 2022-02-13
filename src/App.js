import React, { useState, useEffect } from "react";
import "./index.css";
import carouselDirection, {
  ApiURL,
  defaultTimeInSeconds,
} from "./config/Config";
import InputWrapper from "./components/InputWrapper";
import SliderWrapper from "./components/SliderWrapper";

function App() {
  const [arrImageURLs, setArrImageURLs] = useState([]);
  const [currentCarouselDirection, updateCurrentCarouselDirection] = useState(
    carouselDirection.Forward
  );
  const [currentCarouselDuration, updateCurrentCarouselDuration] =
    useState(defaultTimeInSeconds);

  const updateCarouselConfigurations = (
    updatedCarouselDuration,
    updatedCarouselDirection
  ) => {
    console.log(updatedCarouselDuration, updatedCarouselDirection);
  };

  useEffect(() => {
    fetch(`${ApiURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.images) setArrImageURLs(data.images);
      });
  }, []);

  // console.log("arrImageURLs => ", arrImageURLs);

  return (
    <div className="App">
      <header className="App-header">React-Custom Carousel</header>
      <InputWrapper
        selectedCarouselDirection={currentCarouselDirection}
        updatedCarouselDuration={currentCarouselDuration}
        updateCarouselConfigurations={updateCarouselConfigurations}
      />
      {arrImageURLs.length > 0 ? (
        <SliderWrapper
          sliderImages={arrImageURLs}
          selectedCarouselDirection={currentCarouselDirection}
          updatedCarouselDuration={currentCarouselDuration}
        />
      ) : (
        <p> No Image Found </p>
      )}
    </div>
  );
}

export default App;
