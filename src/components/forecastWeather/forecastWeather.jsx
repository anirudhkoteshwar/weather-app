import React from 'react';
import "./forecastWeather.css";

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ForecastWeather = ({ forecastWeather }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInWeek)
  );

  return (
    <>
      {forecastWeather.list.slice(0, 4).map((item, idx) => {
        return (
          <div className="future-forecast" key={idx}>
            <div className="daily-item">
              <img
                alt="weather"
                className="icon-small"
                src={`icons/${item.weather[0].icon}.svg`}
              />
              <p className="min-max">
                {Math.round(item.main.temp_max)}°C /{" "}
                {Math.round(item.main.temp_min)}°C
              </p>
              <label className="day">{forecastDays[idx]}</label>
            </div>
            <hr className="rounded" id={idx} />
          </div>
        );
      })}
    </>
  );
};

export default ForecastWeather;
