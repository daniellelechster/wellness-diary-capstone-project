import React, { useEffect, useState } from "react";

export default function WeatherDisplay() {
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState(null);

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

  useEffect(() => {
    const lat = 41.4993; // example (CLE)
    const lon = 81.6944;
    const apiKey = "fc441a9252274941253dd899336b6c31";

    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Weather fetch failed");
        return response.json();
      })
      .then((data) => setWeather(data))
      .catch((err) => setWeatherError(err.message));
  }, []);

  return (
    <div className="home-card">
      <div className="home-card-header">
        <span className="home-icon indigo">⛅</span>
        <h3>Weather Overview</h3>
      </div>

      {!weather && !weatherError && <p className="home-subtext">Loading weather...</p>}
      {weatherError && <p className="home-subtext">Unable to load weather</p>}

      {weather && (
        <div className="home-card-content">
          <div className="weather-row">
            <img
              src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <div>
              <p className="home-value">{weather.current.temp}°F</p>
              <p className="home-subtext">{weather.current.weather[0].description}</p>
            </div>
          </div>

          <p className="home-subtext">Feels like: {weather.current.feels_like}°F</p>
          <p className="home-subtext">Sunrise: {formatTime(weather.current.sunrise)}</p>
          <p className="home-subtext">Sunset: {formatTime(weather.current.sunset)}</p>

          <hr style={{ margin: "1rem 0" }} />

          <h4>🌙 Lunar Cycle</h4>
          <p className="home-subtext">
            {getMoonPhase(weather.daily[0].moon_phase)}
          </p>

          <hr style={{ margin: "1rem 0" }} />

          <h4>7-Day Forecast</h4>
          <div className="weekly-grid">
            {weather.daily.slice(1, 8).map((day, index) => (
              <div key={index} className="forecast-item">
                <p className="home-subtext">{formatDay(day.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="forecast icon"
                />
                <p className="home-subtext">High: {day.temp.max}°F</p>
                <p className="home-subtext">Low: {day.temp.min}°F</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
