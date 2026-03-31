# Weather App

A responsive weather application built using React (Vite) that allows users to search for current weather conditions and view a 5-day forecast. The app also supports geolocation to fetch weather data based on the user’s current location.

---

## Features

* Search weather by city name
* Get weather using current location
* Display temperature in Celsius
* Show weather condition and icon
* 5-day forecast (filtered daily data)
* Dynamic background based on weather conditions
* Error handling for invalid inputs and API failures
* Press Enter to search

---

## How It Works

The app uses the OpenWeather API to fetch:

* Current weather data
* 5-day / 3-hour interval forecast data

The forecast data is processed to extract one entry per day, ensuring accurate daily predictions.

---

## Core Functions

### `getWeather()`

Fetches weather data based on user input.

* Calls current weather API using city name
* Handles API errors and invalid city inputs
* Fetches forecast data
* Filters forecast into 5 unique days
* Updates state for UI rendering

---

### `fetchWeatherByCoords(lat, lon)`

Fetches weather using geographic coordinates.

* Used when user enables location access
* Calls API with latitude and longitude
* Updates weather state

---

### `getLocationWeather()`

Uses the browser’s Geolocation API.

* Requests user permission
* Retrieves latitude and longitude
* Calls `fetchWeatherByCoords()`

---

## State Management

| State      | Purpose                         |
| ---------- | ------------------------------- |
| `weather`  | Stores current weather data     |
| `forecast` | Stores processed 5-day forecast |
| `city`     | Stores user input               |
| `error`    | Stores error messages           |

---

## UI Features

* Responsive layout using CSS Grid and Flexbox
* Dynamic backgrounds based on weather conditions:

  * Clear → Sunny theme
  * Clouds → Cloudy theme
  * Rain → Rainy theme
  * Snow → Snowy theme
  * Thunderstorm → Stormy theme

---

## Tech Stack

* React (Vite)
* TypeScript
* CSS (custom styling)
* OpenWeather API

---

## Notes

* Geolocation requires browser permission
* API key is currently stored in the frontend (not secure for production)

---

## Future Improvements

* Add more detailed weather info (humidity, wind speed)
* Improve UI with animations
* Add hourly forecast view
* Store recent searches

---

## Setup

```bash
npm install
npm run dev
```

---

## Acknowledgements

* Weather data provided by OpenWeather API
