import 'whatwg-fetch';
import Slider from './Slider';

const ES6Promise = require('es6-promise');

ES6Promise.polyfill();

const payload = [
  {
    id: 0,
    name: 'North Shore',
    condition: 'Radical',
  },
  {
    id: 1,
    name: 'South Shore',
    condition: 'Conservative',
  },
  {
    id: 2,
    name: 'West Shore',
    condition: 'Radical',
  },
  {
    id: 3,
    name: 'East Shore',
    condition: 'Conservative',
  },
];

const computedHeight = (element) => {
  const height = window.innerHeight;

  const computedSmallClass = (el, h) => {
    if (h < 1024) {
      el.classList.add('small');
      el.classList.remove('all-screen-height');
    } else {
      el.classList.remove('small');
      el.classList.add('all-screen-height');
    }
  };

  computedSmallClass(element, height);

  document.addEventListener(
    'resize',
    () => {
      const newHeight = window.innerHeight;
      computedSmallClass(element, newHeight);
    },
    false,
  );
};

const getUserGeolocation = () => {
  const $element = document.getElementById('geolocation');
  const $cityEl = $element.querySelector('.city');

  $cityEl.innerText = 'Earch';

  window.fetch('https://geoip-db.com/json/').then((response) => {
    response.json().then((json) => {
      $cityEl.innerText = json.city;
    });
  });
};

class FirstScreenSlider extends Slider {
  constructor(mainEl, data) {
    super(mainEl, data);
    this.generateLocations();
    this.updateView();
  }

  updateView() {
    const data = this.payload[this.activeItem];
    this.mainElement.querySelector('.slider__name').innerText = data.name;
    this.mainElement.querySelector('.slider__condition').innerText = data.condition;

    const $locationItems = Array.prototype.slice.call(
      this.mainElement.querySelectorAll('.slider__location-item'),
      0,
    );

    $locationItems.forEach((item) => {
      const id = item.dataset ? item.dataset.id : item.getAttribute('data-id');
      if (+id === this.activeItem) {
        item.classList.add('slider__location-item--active');
      } else {
        item.classList.remove('slider__location-item--active');
      }
    });
  }

  generateLocations() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('slider__location-wrapper');

    // TODO: rewrite to forEach loop
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.payload.length; i++) {
      const item = document.createElement('div');
      item.classList.add('slider__location-item');
      item.setAttribute('data-id', i);

      const itemCount = document.createElement('div');
      itemCount.classList.add('slider__location-item-count');

      const itemName = document.createElement('div');
      itemName.classList.add('slider__location-item-name');

      itemCount.innerText = i < 9 ? `0${this.payload[i].id + 1}` : this.payload[i].id + 1;
      itemName.innerText = this.payload[i].name;

      item.appendChild(itemCount);
      item.appendChild(itemName);

      item.addEventListener('click', () => this.activateById(i));

      wrapper.appendChild(item);
    }

    this.mainElement.querySelector('.slider').appendChild(wrapper);
  }
  prev() {
    super.prev();
    this.updateView();
  }
  next() {
    super.next();
    this.updateView();
  }
  activateById(id) {
    super.activateById(id);
    this.updateView();
  }
}

const firstScreen = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $firstScreen = document.getElementById('first-screen');
    computedHeight($firstScreen);
    getUserGeolocation();

    const firstScreenSlider = new FirstScreenSlider($firstScreen, payload);

    console.dir(firstScreenSlider);
  });

export default firstScreen;
