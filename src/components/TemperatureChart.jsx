import React, { useEffect, useState } from "react";

const TemperatureChart = ({ forecastData }) => {
  const [points, setPoints] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (!forecastData) return;

    const temps = forecastData.list.map((day) => day.main.temp);
    const labels = forecastData.list.map((day) =>
      new Date(day.dt * 1000).toLocaleDateString("it-IT", { weekday: "short" })
    );

    // Normalizziamo i valori per il grafico
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const range = maxTemp - minTemp || 1;

    const chartHeight = 100;
    const chartWidth = 300;
    const pointSpacing = chartWidth / (temps.length - 1);

    const normalizedPoints = temps.map((temp, index) => {
      const x = index * pointSpacing;
      const y = chartHeight - ((temp - minTemp) / range) * chartHeight;
      return `${x},${y}`;
    });

    setPoints(normalizedPoints);
    setLabels(labels);
  }, [forecastData]);

  if (!forecastData) return null;

  return (
    <div className="mt-4">
      <h4>Grafico Temperature</h4>
      <svg width="100%" height="150" viewBox="0 0 300 120">
        {/* Linea */}
        <polyline
          fill="none"
          stroke="blue"
          strokeWidth="2"
          points={points.join(" ")}
        />

        {/* Punti */}
        {points.map((point, index) => {
          const [x, y] = point.split(",");
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="3"
              fill="red"
              stroke="black"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      {/* Etichette sotto il grafico */}
      <div className="d-flex justify-content-between mt-2" style={{ width: 300 }}>
        {labels.map((label, index) => (
          <small key={index}>{label}</small>
        ))}
      </div>
    </div>
  );
};

export default TemperatureChart;
