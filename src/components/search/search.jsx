import searchIcon from "/icons/searchIcon.svg";
import "./search.css";
import { useState } from "react";
import { GEODB_OPTIONS, GEODB_URL } from "../APIs/geodb";

function Search({ onSearchChange }) {

  const [searchValue, setSearchValue] = useState("");

  const getCities = async (inputValue) => {
    try {
      const response = await fetch(
        `${GEODB_URL}?namePrefix=${inputValue}`, GEODB_OPTIONS );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOnChange = (searchData) => {
    setSearchValue(searchData);
    onSearchChange(searchData);
  }

  return (
    <>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Enter City Name"
          id="citySearch"
          value={searchValue}
          onChange={handleOnChange}
          
        />
        <div className="searchIcon">
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <div className="dataResults"></div>
    </>
  );
}

export default Search;
