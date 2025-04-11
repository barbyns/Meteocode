import React, { useState, useEffect } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = 'YOUR_API_KEY'; // Sostituisci con la tua API Key di OpenWeatherMap

  // Funzione per gestire il cambiamento della città
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Funzione per effettuare le chiamate API
  const fetchWeatherData = async () => {
    if (!city.trim()) {
      setError('Per favore, inserisci una città valida.');
      return;
    }

    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);

    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const weather = await weatherResponse.json();
      if (weather.cod !== 200) {
        throw new Error('Città non trovata');
      }
      setWeatherData(weather);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecast = await forecastResponse.json();
      setForecastData(forecast);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Effettua la ricerca quando la città cambia
  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city]);

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
        </div>
      )}

      {forecastData && (
        <div className="forecast">
          <h3>Previsioni per i prossimi giorni</h3>
          <ul>
            {forecastData.list.slice(0, 5).map((forecast) => (
              <li key={forecast.dt}>
                <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {forecast.main.temp}°C</p>
                <p>{forecast.weather[0].description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
