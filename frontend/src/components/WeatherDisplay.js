import React, { useState, useEffect } from "react";


export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);
  const [locationName, setLocationName] = useState(null);

  const getMoonPhase = (phase) => {
    if (phase === 0) return "🌑 New Moon";
    if (phase > 0 && phase < 0.25) return "🌒 Waxing Crescent";
    if (phase === 0.25) return "🌓 First Quarter";
    if (phase > 0.25 && phase < 0.5) return "🌔 Waxing Gibbous";
    if (phase === 0.5) return "🌕 Full Moon";
    if (phase > 0.5 && phase < 0.75) return "🌖 Waning Gibbous";
    if (phase === 0.75) return "🌗 Last Quarter";
    return "🌘 Waning Crescent";
  };

  const formatDay = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchLocationName = (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("location_fetch_failed");
        return res.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          const place = data[0];
          const city = place.name;
          const state = place.state;
          setLocationName(`${city}, ${state}`);
        }
      })
      .catch(() => {
        setLocationName(null);
      });
  };

  const fetchWeather = (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
    )
      .then((response) => {
        if (response.status === 401) {
          throw new Error("bad_api_key");
        }
        if (!response.ok) {
          throw new Error("weather_fetch_failed");
        }
        return response.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => {
        if (err.message === "bad_api_key") {
          setWeatherError(
            "Unable to load weather, please check your API key."
          );
        } else {
          setWeatherError("Unable to load weather for your location.");
        }
      });
  };

  const requestLocation = () => {
    setWeatherError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
        fetchLocationName(latitude, longitude);
      },
      () => {
        setWeatherError(
          "Location access denied. Please enable it in your browser settings."
        );
      }
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setWeatherError("Geolocation is not supported by this browser.");
      return;
    }

    requestLocation();
  }, []);

  return (
    <div className="weather-container">
      {!weather && !weatherError && (
        <p className="weather-text">Loading weather...</p>
      )}

      {weatherError && (
        <div>
          <p className="weather-error-text">{weatherError}</p>
          <button className="weather-retry-button" onClick={requestLocation}>
            Retry Location
          </button>
        </div>
      )}

      {weather && (
        <div className="weather-block">
          {/* Location Display */}
          {locationName && (
            <h3 className="weather-location-text">
              📍 {locationName}
            </h3>
          )}

          {/* Current Conditions */}
          <div className="weather-current">
            <img
              className="weather-icon-large"
              src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <div className="weather-current-info">
              <p className="weather-temp">
                {Math.round(weather.current.temp)}°F
              </p>
              <p className="weather-description">
                {weather.current.weather[0].description}
              </p>
              <p className="weather-details">
                Feels like: {Math.round(weather.current.feels_like)}°F
              </p>
              <p className="weather-details">
                Sunrise: {formatTime(weather.current.sunrise)}
              </p>
              <p className="weather-details">
                Sunset: {formatTime(weather.current.sunset)}
              </p>
            </div>
          </div>

          <hr className="weather-divider" />

          {/* Moon Phase */}
          <div className="weather-lunar">
            <h4 className="weather-lunar-title">🌙 Lunar Cycle</h4>
            <p className="weather-text">
              {getMoonPhase(weather.daily[0].moon_phase)}
            </p>
          </div>

          <hr className="weather-divider" />

          {/* Forecast */}
          <h4 className="weather-section-title">7-Day Forecast</h4>
          <div className="weather-forecast-grid">
            {weather.daily.slice(1, 8).map((day, index) => (
              <div key={index} className="weather-forecast-item">
                <p className="weather-forecast-day">{formatDay(day.dt)}</p>

                <img
                  className="weather-forecast-icon"
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="forecast icon"
                />

                <p className="weather-forecast-text">
                  High: {Math.round(day.temp.max)}°F
                </p>
                <p className="weather-forecast-text">
                  Low: {Math.round(day.temp.min)}°F
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
