import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function SearchForecast() {
  let [city, setCity] = useState("");
  let [forecast, setForecast] = useState({});
  let [infoentered, setInfoentered] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `763b250b80fa958302cdd5a87d7a2da5`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayForecast(response) {
    setInfoentered(true);
    setForecast({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        type="input"
        placeholder="Enter city"
        id="searchEngine"
        onChange={updateCity}
      />
      <input type="submit" id="searchButton" value="Search" />
    </form>
  );

  if (infoentered) {
    return (
      <div>
        {form}
        <br />
        The weather in {city}:
        <ul>
          <li>Temperature: {Math.round(forecast.temperature)}°C</li>
          <li>
            {" "}
            <img src={forecast.icon} alt={forecast.description} />
          </li>
          <li id="weatherdescription">{forecast.description}</li>
          <li>Humidity: {forecast.humidity}%</li>
          <li>Wind: {Math.round(forecast.wind)}m/s</li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
