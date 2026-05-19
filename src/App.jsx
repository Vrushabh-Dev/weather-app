import { useState } from "react";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    try {
      setLoading(true);

      setError("");

      const apiKey = "YOUR_API_KEY";

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");

        setWeather(null);

        return;
      }

      setWeather(data);
    } catch (error) {
      setError("Something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button onClick={getWeather}>Search</button>

      {loading && <p>Loading...</p>}
      {
        error && <p>{error}</p>
      }

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp} °C</h3>
          <p>{weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed}</p>
        </div>
      )}
    </>
  );
};

export default App;
