import React, { useEffect, useState } from 'react';

function WeatherCard({ data }) {
  const [image, setImage] = useState('');

  useEffect(() => {
    
    const fetchImage = async () => {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${data.name}&client_id=YOUR_UNSPLASH_API_KEY`);
      const result = await response.json();
      setImage(result.results[0]?.urls?.regular || 'default-image-url');
    };
    fetchImage();
  }, [data.name]);

  const { main, weather, wind } = data;

  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <img src={image} alt={data.name} />
      <p>{weather[0].description}</p>
      <h3>{main.temp}°C</h3>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;
