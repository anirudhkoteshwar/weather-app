import React from "react";
import "./currentWeather.css";

function CurrentWeather({ currentWeather }) {
  return (
    <div className="weatherPane">
      <div className="topRow">
        <div>
          <p className="city">{currentWeather.city}</p>
          <p className="weather-description">{currentWeather.weather[0].description}</p>
        </div>
        <p className="temperature">{Math.round(currentWeather.main.temp)}°C</p>
      </div>
      <div className="bottomRow">
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${currentWeather.weather[0].icon}.svg`}
        />
      </div>
    </div>
  );
}

export default CurrentWeather;
