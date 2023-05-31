import searchIcon from "/icons/searchIcon.svg";
import closeIcon from "/icons/closeIcon.svg";
import "./search.css";
import { useState, useCallback } from "react";
import { GEODB_OPTIONS, GEODB_URL } from "../APIs/geodb";

function Search({ onSearchChange, setPanelWidth }) {
  const [searchValue, setSearchValue] = useState("");
  const [location, setLocation] = useState([]);
  const [searchbarWidth, setSearchbarWidth] = useState(50);

  const getCities = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEODB_URL}?namePrefix=${inputValue}`,
        GEODB_OPTIONS
      );
      const responseJSON = await response.json();
      console.log(responseJSON);
      const formattedData = formatData(responseJSON);
      setLocation([]);
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
      }, 500);
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
    if (location.length > 0) {
    setPanelWidth(60);
    setSearchbarWidth(80);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearchChange(location);
      if (location.length > 0) {
      setPanelWidth(60);
      setSearchbarWidth(80);
      }
    }
  };

  const handleClearInput = () => {
    if (location.length === 0) {
      return; 
    }
    setSearchValue("");
    optimizedSearch("");
    setLocation([]);
  };

  return (
    <>
      <div className={`searchBar ${(searchbarWidth != 50) && 'triggered' }`} style={{ width: `${searchbarWidth}%` }}>
        <input
          type="text"
          placeholder="Enter City Name"
          id="citySearch"
          value={searchValue}
          onChange={(e) => handleOnChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="searchIcon">
          {location.length === 0 ? (
            <img src={searchIcon} alt="Search Icon" />
          ) : (
            <img
              src={closeIcon}
              alt="Close Icon"
              id="CloseButton"
              onClick={handleClearInput}
            />
          )}
        </div>
      </div>
      {location.length > 0 && searchValue !== "" && (
        <div className={`dataResults ${(searchbarWidth != 50) && 'triggered' }`}style={{ width: `${searchbarWidth}%` }}>
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
