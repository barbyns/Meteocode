import React from "react";

const WeatherForecast = ({ forecastData }) => {
  if (!forecastData) return null;

  return (
    <div>
      <h4>Previsioni per i prossimi giorni</h4>
      <ul className="list-group">
        {forecastData.list.map((day, index) => (
          <li className="list-group-item" key={index}>
            <strong>{new Date(day.dt * 1000).toLocaleDateString()}</strong>
            <p>Max: {day.main.temp_max}°C | Min: {day.main.temp_min}°C</p>
            <p>{day.weather[0].description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeatherForecast;
