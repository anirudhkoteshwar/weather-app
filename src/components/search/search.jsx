import searchIcon from "/icons/searchIcon.svg";
import "./search.css";
import { useState, useCallback, useEffect } from "react";
import { GEODB_OPTIONS, GEODB_URL } from "../APIs/geodb";
import React from "react";

function Search({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState([]);

  const getCities = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEODB_URL}?namePrefix=${inputValue}`,
        GEODB_OPTIONS
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      const formattedData = formatData(responseJSON);
      setLocation(formattedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatData = (obj) => {
    return obj.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
    }));
  };

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 600);
    };
  };

  const optimizedSearch = useCallback(debounce(getCities), []);

  const handleOnChange = (searchData) => {
    setSearchValue(searchData);
    optimizedSearch(searchData);
  };

  const handleAutocomplete = (selectedCity) => {
    setSearchValue(selectedCity.label);
    setLocation([]);
    onSearchChange([selectedCity]);
  };

  useEffect(() => {
    console.log(location);
    if (location.length > 0) {
      onSearchChange(location);
    }
  }, [location, onSearchChange]);

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter City Name"
          id="citySearch"
          value={searchValue}
          onChange={(e) => handleOnChange(e.target.value)}
        />
        <div className="searchIcon">
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      {location.length > 0 && (
        <div className="dataResults">
          {location.slice(0, 5).map((value, key) => (
            <a
              key={key}
              className="dataItem"
              id={`location-${key}`}
              onClick={() => handleAutocomplete(value)}
            >
              <p>{value.label}</p>
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default Search;
