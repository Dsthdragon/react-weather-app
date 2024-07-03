import { useEffect, useState } from "react";
import Search from "../search";
import config from "../../assets/config";
import { BaseWeather } from "../../interfaces/weather";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<BaseWeather | null>(null);
  async function fetchWeatherData(param: string) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${config.openWeatherKey}`
      );

      const data = await response.json();
      if (data) setWeatherData(data);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  async function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-NG", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("bangalore");
  }, []);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div className="loading">Loading....</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, {weatherData?.sys.country}
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temperature">{weatherData?.main.temp}</div>
          <p className="description">{weatherData?.weather[0].description}</p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
