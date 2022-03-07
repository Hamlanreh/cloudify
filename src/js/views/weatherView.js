import icons from 'url:../../images/icons/sprite.svg';
import { IMAGE_URL } from '../config';

class WeatherView {
  #parentElement = document.querySelector('.weather__list');
  #weather;

  render(weather) {
    this.#weather = weather;
    this._clear();
    const markup = this._generateWeatherMarkup(this.#weather);
    document.querySelector(
      '.forecast__title > h2'
    ).textContent = `Forecast: ${weather.name}, ${weather.country}`;
    document.querySelector('.forecasts').dataset.id = weather.id;
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerClick(handler) {
    this.#parentElement.addEventListener('click', handler);
  }

  addHandlerDelete(handler) {
    this.#parentElement.addEventListener('click', handler);
  }

  deleteWeather(id) {
    this.#parentElement.removeChild(
      document.querySelector(`[data-id="${id}"]`)
    );
  }

  _clear() {
    this.#parentElement.innerHTML = '';
  }

  _generateWeatherMarkup(weather) {
    return `
      <li class="weather" data-id="${weather.id}">
        <div class="weather__head">
          <svg class="weather__icon">
            <use
              xlink:href="${icons}#icon-location2"
            ></use>
          </svg>
          <p class="paragraph weather__location">
            ${weather?.name ?? ''}, ${weather?.country ?? ''}
          </p>
          <button class="weather__close">&times;</button>
        </div>

        <div class="weather__data">
          
          <div>
            <svg class="weather__icon">
              <use
                xlink:href="${icons}#icon-thermometer"
              ></use>
            </svg>          
            <h1 class="heading--1 weather__temperature">${
              weather.temp
            }&deg;c</h1>

            <img 
            src="${IMAGE_URL}${weather.icon}.png" 
            alt="Weather image" 
            class="weather__image" 
          />
            <p class="paragraph weather__description">${weather.description}</p>
          </div>
        </div>

        <ul class="weather__list__more">
          <li>
            <svg class="weather__icon">
              <use
                xlink:href="${icons}#icon-sunrise"
              ></use>
            </svg>
            <h3 class="heading--3">Sunrise <span>${weather.sunrise}</span></h3>
          </li>
          <li>
            <svg class="weather__icon">
              <use
                xlink:href="${icons}#icon-sunset"
              ></use>
            </svg>
            <h3 class="heading--3">Sunset <span>${weather.sunset}</span></h3>
          </li>
          <li>
            <svg class="weather__icon">
              <use
                xlink:href="${icons}#icon-droplet"
              ></use>
            </svg>
            <h3 class="heading--3">Humidity <span>${
              weather.humidity
            }</span></h3>
          </li>
          <li>
            <svg class="weather__icon">
              <use
                xlink:href="${icons}#icon-barometer"
              ></use>
            </svg>
            <h3 class="heading--3">Pressure <span>${
              weather.pressure
            }</span></h3>
          </li>
        </ul>
      </li>
    `;
  }
}

export default new WeatherView();
