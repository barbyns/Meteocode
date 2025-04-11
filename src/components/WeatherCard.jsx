import React from "react";

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{weatherData.name}</h5>
        <p className="card-text">Temperatura: {weatherData.main.temp}°C</p>
        <p className="card-text">Descrizione: {weatherData.weather[0].description}</p>
        <p className="card-text">Umidità: {weatherData.main.humidity}%</p>
        <p className="card-text">Vento: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
