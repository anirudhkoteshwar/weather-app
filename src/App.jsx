import "./App.css";
import Search from "./components/search/search";
import { useState } from "react";

function App() {

  const handleSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
  }

  return (
    <div className="panelWrapper">
      <div className="leftPanel"></div>
      <div className="rightPanel">
        <Search onSearchChange={handleSearchChange} />
      </div>
    </div>
  );
}

export default App;
