import 'whatwg-fetch';

const ES6Promise = require('es6-promise');

ES6Promise.polyfill();

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

const firstScreen = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $firstScreen = document.getElementById('first-screen');
    computedHeight($firstScreen);
    getUserGeolocation();
  });

export default firstScreen;
