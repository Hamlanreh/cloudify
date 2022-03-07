import icons from 'url:../../images/icons/sprite.svg';
import { IMAGE_URL } from '../config';

class ForecastView {
  #parentElement = document.querySelector('.forecasts');

  render(forecasts) {
    this._clear();
    const markup = this._generateForecastMarkup(forecasts);
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this.#parentElement.innerHTML = '';
  }

  deleteForecast(weatherId) {
    const forecasts = document.querySelector('.forecasts');
    if (forecasts.dataset.id !== weatherId) return;
    document.querySelector('.forecast__title > h2').textContent = `Forecast: `;
    forecasts.innerHTML = '';
  }

  _generateForecastMarkup(forecasts) {
    const markup = forecasts
      .map(weather => {
        return `
            <li class="forecast">
                <div class="forecast__head">
                    <h2 class="heading--2">${weather.daytime}</h2>
                </div>

                <div class="forecast__data">
                    <div>
                        <svg class="forecast__icon">
                        <use
                            xlink:href="${icons}#icon-thermometer"
                        ></use>
                        </svg>
                        <h1 class="heading--1 forecast__temperature">${weather.temp}&deg;c</h1>

                        <img
                        src="${IMAGE_URL}${weather.icon}.png"
                        alt="forecast image"
                        class="forecast__image"
                        />
                        <p class="paragraph forecast__description">${weather.description}</p>
                    </div>
                </div>

                <ul class="forecast__list__more">
                    <li>
                        <svg class="forecast__icon">
                        <use
                            xlink:href="${icons}#icon-sunrise"
                        ></use>
                        </svg>
                        <h3 class="heading--3">Sunrise <span>${weather.sunrise}</span></h3>
                    </li>
                    <li>
                        <svg class="forecast__icon">
                        <use
                            xlink:href="${icons}#icon-sunset"
                        ></use>
                        </svg>
                        <h3 class="heading--3">Sunset <span>${weather.sunset}</span></h3>
                    </li>
                    <li>
                        <svg class="forecast__icon">
                        <use
                            xlink:href="${icons}#icon-droplet"
                        ></use>
                        </svg>
                        <h3 class="heading--3">Humidity <span>${weather.humidity}</span></h3>
                    </li>
                    <li>
                        <svg class="forecast__icon">
                        <use
                            xlink:href="${icons}#icon-barometer"
                        ></use>
                        </svg>
                        <h3 class="heading--3">Pressure <span>${weather.pressure}</span></h3>
                    </li>
                </ul>
            </li>
        `;
      })
      .join('');
    return markup;
  }
}

export default new ForecastView();
