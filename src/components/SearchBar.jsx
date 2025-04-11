import React, { useState } from "react";

const SearchBar = ({ onCitySearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      onCitySearch(city);
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Inserisci una città"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-2">
        Cerca
      </button>
    </form>
  );
};

export default SearchBar;
