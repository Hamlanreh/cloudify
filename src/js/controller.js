import * as model from './model';
import mapView from './views/mapView';
import weatherView from './views/weatherView';
import searchView from './views/searchView';
import forecastView from './views/forecastView';

const controlLoadMap = async function () {
  try {
    // Render spinner
    mapView.renderSpinner();
    // Get current location position
    const position = await model.getPosition();
    // Get location weather
    const weather = await model.getLocationWeather(position);
    // Get location message
    const city = `${weather.name}, ${weather.country}`;
    // Render map and map marker at location
    mapView.render(position, city);
    // Render weather data of location
    weatherView.render(weather);
    // Get location 7 days weather forcast
    const weatherForcasts = await model.get7DaysForcast(position);
    // Render the weather forcast in view
    forecastView.render(weatherForcasts);
  } catch (err) {
    mapView.renderError();
  }
};

const controlSearchWeather = async function () {
  try {
    // Get location weather
    const weather = await model.searchWeather(searchView.getQuery());
    // Get location weather position coordinates
    const position = { ...weather.coord };
    // Get location message
    const city = `${weather.name}, ${weather.country}`;
    // Render location marker with message on map
    mapView.renderMarker(position, city);
    // Render search result
    searchView.render(weather);
    // Get location 7 days weather forcast
    const weatherForcasts = await model.get7DaysForcast(position);
    // Render the weather forcast in view
    forecastView.render(weatherForcasts);
  } catch (err) {
    mapView.renderError('Enter a correct location (i.e London) for weather');
  }
};

const controlDeleteWeather = function (e) {
  if (!e.target.classList.contains('weather__close')) return;

  const weather = e.target.closest('.weather');
  const weatherId = weather.dataset.id;
  forecastView.deleteForecast(weatherId);
  weatherView.deleteWeather(weatherId);
};

const controlClickWeather = async function (e) {
  try {
    if (!e.target.classList.contains('weather')) return;

    // Selected weather id
    const weatherId = e.target.dataset.id;
    // Get location weather id
    const weather = await model.searchWeatherWithId(weatherId);

    document.querySelector('.forecasts').dataset.id = weatherId;
    document.querySelector(
      '.forecast__title > h2'
    ).textContent = `Forecast: ${weather.name}, ${weather.country}`;

    // Get location weather position coordinates
    const position = { ...weather.coord };
    // Get location 7 days weather forcast
    const weatherForcasts = await model.get7DaysForcast(position);
    // Render the weather forcast in view
    forecastView.render(weatherForcasts);
  } catch (err) {
    mapView.renderError('Weather location does not exist');
  }
};

const init = function () {
  mapView.addHandlerLoadMap(controlLoadMap);
  searchView.addHandlerSearch(controlSearchWeather);
  weatherView.addHandlerDelete(controlDeleteWeather);
  weatherView.addHandlerClick(controlClickWeather);
};
init();
