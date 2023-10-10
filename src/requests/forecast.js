const axios = require("axios");

const URL = "https://api.weatherapi.com/v1/forecast.json";
const FORECAST_DAYS = 3;

async function fetchForecast(location) {
  try {
    const response = await axios({
      url: URL,
      method: "get",
      params: {
        q: location,
        days: FORECAST_DAYS,
        key: process.env.WEATHER_API_KEY,
      },
      responseType: "json",
    });
    const city = response.data.location.name;
    const country = response.data.location.country;
    const locationName = `${city}, ${country}`;
    const weatherData = response.data.forecast.forecastday.map(
      (forecast_day) => {
        return {
          date: forecast_day.date,

          temperatureMinC: forecast_day.day.mintemp_c,
          temperatureMaxC: forecast_day.day.maxtemp_c,
          temperatureMinF: forecast_day.day.mintemp_f,
          temperatureMaxF: forecast_day.day.maxtemp_f,

          sunriseTime: forecast_day.astro.sunrise,
          sunsetTime: forecast_day.astro.sunset,
          moonriseTime: forecast_day.astro.moonrise,
          moonsetTime: forecast_day.astro.moonset,
        };
      }
    );

    return {
      locationName,
      weatherData,
    };
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching forecast for ${location}.`);
  }
}

module.exports = {
  fetchForecast,
};
