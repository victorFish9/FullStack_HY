import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

//https://api.openweathermap.org/data/2.5/weather?q=London

const CountryDetails = ({ country }) => {
    const [weather, setWeather] = useState(null);
    const apiKey = '9343f8a9dd9aa86bc05ceb1398921a96';

    useEffect(() => {
        if (country) {
            const capital = country.capital[0];
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

            axios.get(apiUrl)
                .then(response => {
                    setWeather(response.data);
                })
                .catch(error => {
                    console.error("Error fetching the weather data: ", error)
                })
        }
    }, [country])

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} km²</p>

            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>

            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

            {weather && (
                <div>
                    <h3>Weather in {country.capital[0]}</h3>
                    <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
                    <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
                    <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                    />
                </div>
            )}
        </div>
    );
};


export default CountryDetails;