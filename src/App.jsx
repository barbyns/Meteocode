import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const apiKey = '30aaeaea0d6c2d20535f003c28d480f3'; 
  useEffect(() => {
 
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(searches);
  }, []);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError('Per favore, inserisci una città valida.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weather = await weatherResponse.json();
      if (weather.cod !== 200) {
        throw new Error('Città non trovata');
      }
      setWeatherData(weather);
      // Memorizza la città nelle ultime ricerche
      const newSearches = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5); // Mantiene solo le ultime 5 ricerche
      setRecentSearches(newSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Meteo</h1>
      <input
        type="text"
        placeholder="Inserisci la città"
        value={city}
        onChange={handleCityChange}
      />
      <button onClick={fetchWeatherData}>Cerca</button>

      {loading && <p>Caricamento...</p>}

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Umidità: {weatherData.main.humidity}%</p>
          <Link to={`/details/${weatherData.name}`}>Vai ai dettagli</Link>
        </div>
      )}

      <h3>Ultime ricerche</h3>
      <ul>
        {recentSearches.map((search, index) => (
          <li key={index}>
            <Link to={`/details/${search}`}>{search}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
