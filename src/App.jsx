import "./App.css";
import Search from "./components/search/search";
import { useState } from "react";
import {
  WEATHER_API_URL,
  WEATHER_API_KEY,
} from "./components/APIs/openweather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [fetchInProgress, setFetchInProgress] = useState(false); 


  const handleOnSearchChange = (searchData) => {
    const selectedCity = searchData[0];
    if (selectedCity && selectedCity.value) {
      console.log(selectedCity);
      const [lat, lon] = selectedCity.value.split(" ");

      if (!fetchInProgress) {
        setFetchInProgress(true); 
  
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
          .catch((err) => console.error(err))
          .finally(() => {
            setFetchInProgress(false); 
          });
      }
    }
  };

  console.log(currentWeather);
  console.log(forecast);

  const backgroundImageID = currentWeather?.weather?.[0]?.icon
    ? `${currentWeather.weather[0].icon}.jpg`
    : "unknown.jpg";
  console.log(backgroundImageID);

  return (
    <div className="panelWrapper">
      <div className="leftPanel"></div>
      <div className="rightPanel">
        <Search onSearchChange={handleOnSearchChange} />
      </div>
    </div>
  );
}

export default App;
