import * as L from 'leaflet';
import icons from 'url:../../images/icons/sprite.svg';

class MapView {
  #parentElement = document.querySelector('#map');
  #map;
  #errorMessage = `Map can't access location, Enable GPS and refresh please.`;

  render(position, message) {
    this._clear();
    // Get position latitude and longitude
    const { lat, lon } = position;

    this.#map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.renderMarker({ lat, lon }, message);
  }

  addHandlerLoadMap(handler) {
    window.addEventListener('load', handler);
  }

  _clear() {
    this.#parentElement.innerHTML = '';
  }

  renderMarker(position, message = '') {
    // Get position latitude and longitude
    const { lat, lon } = position;
    // Create and add marker to map
    L.marker([lat, lon])
      .addTo(this.#map)
      .bindPopup(message || 'A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();
  }

  renderSpinner() {
    const markup = `
      <div class="spinner__box">
        <svg class="spinner__icon">
          <use xlink:href="${icons}#icon-spinner4"></use>
        </svg>
      </div>
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
      <div class="error">${message} 🔥</div>
    `;
    this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new MapView();
