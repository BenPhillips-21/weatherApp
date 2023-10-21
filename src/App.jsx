import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('london');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(searchQuery);
  };

  async function getWeather(location) {
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=41687e0cbc3c46e6beb31115231410&q=${location}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWeather(location)
  }, [location]);

  return (
    <div className="minion">
      {weatherData &&
        <div>
          <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search location..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
        <div className="bello">
          <h2>Location: {weatherData.location.name}, {weatherData.location.country}</h2>
          <h2>Temperature: {weatherData.current.temp_c}°C</h2>
          <h2>Humidity: {weatherData.current.humidity}%</h2>
          <h2>Feels Like: {weatherData.current.feelslike_c}°C</h2>
          <h2>Wind: {weatherData.current.wind_kph}Km/h, {weatherData.current.wind_dir}</h2>
          </div>
        </div>
}
    </div>
  );
}

export default App;