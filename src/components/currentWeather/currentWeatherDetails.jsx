import React from "react";
import "./currentWeatherDetails.css";

function CurrentWeatherDetails({ currentWeather }) {
  return (
    <div className="currentWeatherDetails">
      <div className="title">
        <span className="header">Details</span>
      </div>
      <div className="parameter">
        <span className="label">Feels like</span>
        <span className="value">
          {Math.round(currentWeather.main.feels_like)}°C
        </span>
      </div>
      <div className="parameter">
        <span className="label">Wind</span>
        <span className="value">{currentWeather.wind.speed} m/s</span>
      </div>
      <div className="parameter">
        <span className="label">Humidity</span>
        <span className="value">{currentWeather.main.humidity}%</span>
      </div>
      <div className="parameter bottom">
        <span className="label">Pressure</span>
        <span className="value">{currentWeather.main.pressure} hPa</span>
      </div>
    </div>
  );
}

export default CurrentWeatherDetails;
