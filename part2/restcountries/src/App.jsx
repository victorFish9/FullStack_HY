import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryDisplay from './components/CountryDisplay';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (searchTerm) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const results = response.data.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setFilteredCountries(results);
          setSelectedCountry(null); // Reset selected country when search changes
        });
    } else {
      setFilteredCountries([]);
      setSelectedCountry(null);
    }
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        <label>Find countries: </label>
        <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <CountryDisplay
        countries={filteredCountries}
        selectedCountry={selectedCountry}
        onShowCountry={handleShowCountry}
      />
    </div>
  );
};

export default App;
