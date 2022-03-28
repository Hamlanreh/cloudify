import { API_URL, API_KEY, API_FORECAST_URL } from './config';
import { getJSON, getWeatherData, getLocationForcast } from './helper';

export const state = {
  key: API_KEY,
  coord: {
    lat: '',
    lon: '',
  },
  weather: {},
  forcast7DaysWeather: [],
  search: {
    query: '',
    result: {},
  },
};

export const getPosition = async function () {
  try {
    // Get geolocation coordinates (Longitude & Latitude)
    const position = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;

    state.coord.lat = latitude;
    state.coord.lon = longitude;
    return state.coord;
  } catch (err) {
    throw err;
  }
};

export const getLocationWeather = async function (position) {
  try {
    // Get location weather data
    const weather = await getJSON(
      `${API_URL}?lat=${position.lat}&lon=${position.lon}&units=metric&appid=${state.key}`
    );
    // Get weather data
    state.weather = getWeatherData(weather);
    return state.weather;
  } catch (err) {
    throw err;
  }
};

export const get7DaysForcast = async function (position) {
  try {
    const weather = await getJSON(
      `${API_FORECAST_URL}?lat=${position.lat}&lon=${position.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${state.key}`
    );
    const forcast7DaysWeather = getLocationForcast(weather.daily);
    state.forcast7DaysWeather = forcast7DaysWeather;
    return forcast7DaysWeather;
  } catch (err) {
    throw err;
  }
};

export const searchWeather = async function (query) {
  try {
    let weather = await getJSON(
      `${API_URL}?q=${query}&units=metric&appid=${state.key}`
    );
    weather = getWeatherData(weather);

    state.search.query = query;
    state.search.result = weather;
    return weather;
  } catch (err) {
    throw err;
  }
};

export const searchWeatherWithId = async function (queryId) {
  try {
    let weather = await getJSON(
      `${API_URL}?id=${queryId}&units=metric&appid=${state.key}`
    );
    weather = getWeatherData(weather);
    state.search.query = queryId;
    state.search.result = weather;
    return weather;
  } catch (err) {
    throw err;
  }
};
