import { Box, Heading } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "./index.scss";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const API_KEY = "2cbd1f49c8e320b9662e8f052fbd3a8f";
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    if (latitude && longitude) {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        .catch((error) => console.error(error));
    }
  }, [latitude, longitude]);

  return (
    <Box
      bg="#2A3F74"
      borderRadius="10px"
      padding="20px"
      className="weather-container"
    >
      {weatherData ? (
        <div>
          <Heading>{weatherData.name}</Heading>
          {weatherData.main && weatherData.main.temp ? (
            <p>Temperature: {weatherData.main.temp} &#8451;</p>
          ) : (
            <p>Temperature data is not available.</p>
          )}
          {weatherData.weather && weatherData.weather[0] ? (
            <p>Weather: {weatherData.weather[0].description}</p>
          ) : (
            <p>Weather data is not available.</p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Box>
  );
};

export default Weather;
