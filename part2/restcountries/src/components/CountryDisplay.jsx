import React from 'react';
import CountryDetails from "./CountryDetails";

const CountryDisplay = ({ countries, selectedCountry, onShowCountry }) => {
    if (selectedCountry) {
        return <CountryDetails country={selectedCountry} />;
    }

    if (countries.length > 10) {
        return <p>Too many matches, please specify another filter.</p>;
    }

    if (countries.length > 1) {
        return (
            <ul>
                {countries.map((country) => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => onShowCountry(country)}>Show</button>
                    </li>
                ))}
            </ul>
        )
    }

    if (countries.length === 1) {
        return <CountryDetails country={countries[0]} />
    }

    return <p>No matches found.</p>;
}

export default CountryDisplay;