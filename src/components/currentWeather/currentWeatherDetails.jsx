import React from "react";
import "./currentWeatherDetails.css";

function CurrentWeatherDetails({ currentWeather }) {
  return (
    <div className="details">
      <div className="parameter-row">
        <span className="parameter-label top">Details</span>
      </div>
      <div className="parameter-row">
        <span className="parameter-label">Feels like</span>
        <span className="parameter-value">
          {Math.round(currentWeather.main.feels_like)}°C
        </span>
      </div>
      <div className="parameter-row">
        <span className="parameter-label">Wind</span>
        <span className="parameter-value">{currentWeather.wind.speed} m/s</span>
      </div>
      <div className="parameter-row">
        <span className="parameter-label">Humidity</span>
        <span className="parameter-value">{currentWeather.main.humidity}%</span>
      </div>
      <div className="parameter-row bottom">
        <span className="parameter-label">Pressure</span>
        <span className="parameter-value">{currentWeather.main.pressure} hPa</span>
      </div>
    </div>
  );
}

export default CurrentWeatherDetails;
