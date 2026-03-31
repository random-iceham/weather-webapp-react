import "./App.css";
import { useState } from "react";

function App() {
  type WeatherData = {
    name: string;
    sys: {
      country: string;
    };
    main: {
      temp: number;
    };
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
  };

  //variables
  const apiKey = "bc609fb37da2121986406e9b4a030043";
  const [weather, setWeather] = useState<WeatherData | null>(null); //weather can either be WeatherData OR null
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null); // clear previous errors
      } else {
        setWeather(null);
        setError(data.message);
      }
    } catch (err) {
      setWeather(null);
      setError("Something went wrong. Please try again.");
    }

    // const forecastResponse = await fetch(
    //   `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
    // );
    // const forecastData = await forecastResponse.json();
    // setForecast(forecastData.list.slice(0, 5));

    try {
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
      );

      const forecastData = await forecastResponse.json();

      if (forecastResponse.ok) {
        const dailyForecast: any[] = [];
        const datesSeen: Set<string> = new Set();

        for (const item of forecastData.list) {
          const date = new Date(item.dt * 1000).toLocaleDateString();

          if (!datesSeen.has(date)) {
            dailyForecast.push(item);
            datesSeen.add(date);
          }

          if (dailyForecast.length === 5) break;
        }

        setForecast(dailyForecast);
        setError(null); // clear previous errors
      } else {
        // setForecast(null);
        setError(forecastData.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
    );

    const data = await response.json();
    setWeather(data);
  };

  const getLocationWeather = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetchWeatherByCoords(lat, lon);
      },
      () => {
        alert("Unable to retrieve your location.");
      },
    );
  };

  let backgroundClass = "default";
  if (weather) {
    const condition = weather.weather[0].main;

    if (condition === "Clear") backgroundClass = "sunny";
    else if (condition === "Clouds") backgroundClass = "cloudy";
    else if (condition === "Rain" || condition === "Drizzle")
      backgroundClass = "rainy";
    else if (condition === "Snow") backgroundClass = "snowy";
    else if (condition === "Thunderstorm") backgroundClass = "stormy";
  }

  return (
    <div className={`container ${backgroundClass}`}>
      <h1>Weather App</h1>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && city.trim() !== "") {
              getWeather();
            }
          }}
          className="input"
        />
        <button onClick={getWeather} className="button">
          Search
        </button>
        <button onClick={getLocationWeather} className="button">
          Use My Location
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* {weather && (
        <div className="card">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && (
        <div className="forecast">
          {forecast.map((item, index) => (
            <div key={index} className="forecastCard">
              <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>

              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              />

              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      )} */}
      {weather && (
        <div className="mainWeather">
          <div className="leftPanel">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />

            <p className="temp">{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>

          <div className="rightPanel">
            <div className="infoCard">other info</div>

            {forecast.length > 0 && (
              <div className="forecastBox">
                {forecast.map((item, index) => (
                  <div key={index} className="forecastCard">
                    <p>
                      {new Date(item.dt * 1000).toLocaleDateString(undefined, {
                        weekday: "short",
                      })}
                    </p>

                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    />

                    <p>{Math.round(item.main.temp)}°C</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
