import "./App.css";
import Search from "./components/search/search";
import CurrentWeather from "./components/currentWeather/currentWeather";
import CurrentWeatherDetails from "./components/currentWeather/currentWeatherDetails";
import ForecastWeather from "./components/forecastWeather/forecastWeather";
import { useState , useEffect } from "react";
import {
  WEATHER_API_URL,
  WEATHER_API_KEY,
} from "./components/APIs/openweather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [panelWidth, setPanelWidth] = useState(0);

  const handleOnSearchChange = (searchData) => {
    const city = searchData[0];
    if (city && city.value) {
      setSelectedCity(city);
    }
  };

 useEffect(() => {
    if (selectedCity) {
      const [lat, lon] = selectedCity.value.split(" ");

      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      const forecastWeatherFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      Promise.all([currentWeatherFetch, forecastWeatherFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          setCurrentWeather({ city: selectedCity.label, ...weatherResponse });
          setForecast({ city: selectedCity.label, ...forecastResponse });
        })
        .catch((err) => console.error(err));
    }
  }, [selectedCity]);

  console.log(currentWeather);
  console.log(forecast);

  const backgroundImageID = currentWeather?.weather?.[0]?.icon
    ? `${currentWeather.weather[0].icon}.jpg`
    : "unknown.jpg";
  console.log(backgroundImageID);

  return (
    <div className="panelWrapper">
      <div className="leftPanel" style={
        {width: `${panelWidth}%`}
      }>
        {currentWeather && <CurrentWeather currentWeather={currentWeather}/>}
      </div>
      <div className="rightPanel" style={
        {width: `${100 - panelWidth}%`}
      }>
        <Search onSearchChange={handleOnSearchChange} setPanelWidth={setPanelWidth} />
        {currentWeather && <CurrentWeatherDetails currentWeather={currentWeather}/>}
        {forecast && <ForecastWeather forecastWeather={forecast} className='forecastWeather'/>}
      </div>
    </div>
  );
}

export default App;
