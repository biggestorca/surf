import Slider from './Slider';
// import isNaN from './isNaN';
// import { isIE } from './checkBrowser';
import payload from './sleepData';
import declension from './declension';

class SleepSlider extends Slider {
  init() {
    super.init();
    this.setCurrentResortDestination();
    this.setCurrentResortRating();
    this.setCurrentLocationImage();
    this.setParametersToStorage();
    this.setCurrentParameters();
    this.addParametersListeners();
  }

  updateView() {
    super.updateView();
    this.setCurrentResortDestination();
    this.setCurrentResortRating();
    this.setCurrentLocationImage();
    this.setParametersToStorage();
    this.setCurrentParameters();
  }

  setCurrentResortDestination() {
    const currentData = this.payload[this.activeItem];
    const currentLocation = this.mainElement.querySelector('#sleep-location');
    currentLocation.innerHTML = `${currentData.resort} <span class="divider">|</span> ${
      currentData.country
    }`;
  }
  setCurrentResortRating() {
    const currentData = this.payload[this.activeItem];
    const $resortRating = this.mainElement.querySelector('#sleep__rating');
    const $ratingImgsWrapper = document.createElement('div');
    $ratingImgsWrapper.classList.add('sleep__rating-stars');
    switch (currentData.rating) {
      case 1:
        $resortRating.innerText = 'Run forest, run';
        break;
      case 2:
        $resortRating.innerText = 'bad';
        break;
      case 3:
        $resortRating.innerText = 'so so';
        break;
      case 4:
        $resortRating.innerText = 'normal';
        break;
      case 5:
        $resortRating.innerText = 'excellent';
        break;
      default:
        $resortRating.innerText = "Don't know";
        break;
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = currentData.rating; i < len; i++) {
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const starPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      star.setAttribute('width', '22');
      star.setAttribute('height', '22');
      star.setAttribute('viewBox', '0 0 22 22');
      star.setAttribute('fill', 'none');

      starPath.setAttribute(
        'd',
        'M10.9545 0L14.1496 7.5896L22 8.4542L16.066 13.9302L17.801 22L10.9545 17.7728L4.19896 22L5.93402 13.9302L0 8.4542L7.85043 7.5896L10.9545 0Z',
      );
      starPath.setAttribute('fill', '#4AF6CD');
      star.appendChild(starPath);

      $ratingImgsWrapper.appendChild(star);
    }
    $resortRating.appendChild($ratingImgsWrapper);
  }
  setCurrentLocationImage() {
    const currentData = this.payload[this.activeItem];
    const $img = this.mainElement.querySelector('#sleep__location-image');
    $img.setAttribute('src', currentData.locationImage);
  }

  setCurrentParameters() {
    const currentData = this.payload[this.activeItem];
    let dataFromStorage = null;
    if (window.localStorage.getItem('sleep-data')) {
      dataFromStorage = JSON.parse(window.localStorage.getItem('sleep-data'));
    }

    const $resort = this.mainElement.querySelector('#sleep__resort');
    $resort.innerHTML = `${currentData.resort} <br/> ${currentData.country}`;

    const $night = this.mainElement.querySelector('#sleep__night');
    const $guest = this.mainElement.querySelector('#sleep__guests');
    const $pricing = this.mainElement.querySelector('#sleep__pricing');
    const $whatPrice = this.mainElement.querySelector('#per-night');

    $night.setAttribute('data-value', dataFromStorage.night);
    $guest.setAttribute('data-value', dataFromStorage.guest);
    $pricing.setAttribute('data-value', dataFromStorage.price);
    $night.innerHTML = `<span>${dataFromStorage.night}</span> ${declension(dataFromStorage.night, [
      'night',
      'nights',
      'nights',
    ])}`;
    $guest.innerHTML = `<span>${dataFromStorage.guest}</span> ${declension(dataFromStorage.guest, [
      'guest',
      'guests',
      'guests',
    ])}`;
    $pricing.innerText = `$ ${dataFromStorage.price} usd`;
    $whatPrice.innerText = dataFromStorage.night > 1 ? 'all time' : 'per night';
  }

  setParametersToStorage() {
    const currentData = this.payload[this.activeItem];

    if (window.localStorage.getItem('sleep-data')) {
      let data = JSON.parse(window.localStorage.getItem('sleep-data'));
      data = Object.assign(data, { price: currentData.price * data.night });
      window.localStorage.setItem('sleep-data', JSON.stringify(data));
    } else {
      const data = {
        night: 1,
        guest: 1,
        price: currentData.price,
      };
      window.localStorage.setItem('sleep-data', JSON.stringify(data));
    }
  }

  addParametersListeners() {
    const $incrementNight = this.mainElement.querySelector('#increment-night');
    const $decrementNight = this.mainElement.querySelector('#decrement-night');
    const $incrementGuest = this.mainElement.querySelector('#increment-guest');
    const $decrementGuest = this.mainElement.querySelector('#decrement-guest');

    $incrementNight.addEventListener('click', () => this.incrementNight(), false);
    $decrementNight.addEventListener('click', () => this.decrementNight(), false);

    $incrementGuest.addEventListener('click', () => this.incrementGuest(), false);
    $decrementGuest.addEventListener('click', () => this.decrementGuest(), false);
  }

  incrementNight() {
    const currentData = this.payload[this.activeItem];

    if (window.localStorage.getItem('sleep-data')) {
      let data = JSON.parse(window.localStorage.getItem('sleep-data'));
      data = Object.assign(data, { night: data.night + 1, price: data.price + currentData.price });

      window.localStorage.setItem('sleep-data', JSON.stringify(data));
      this.setCurrentParameters();
    }
  }

  decrementNight() {
    const currentData = this.payload[this.activeItem];

    if (window.localStorage.getItem('sleep-data')) {
      let data = JSON.parse(window.localStorage.getItem('sleep-data'));
      data = Object.assign(data, {
        night: data.night > 1 ? data.night - 1 : 1,
        price: data.night > 1 ? data.price - currentData.price : data.price,
      });

      window.localStorage.setItem('sleep-data', JSON.stringify(data));
      this.setCurrentParameters();
    }
  }
  // eslint-disable-next-line class-methods-use-this
  incrementGuest() {
    // const currentData = this.payload[this.activeItem];

    if (window.localStorage.getItem('sleep-data')) {
      let data = JSON.parse(window.localStorage.getItem('sleep-data'));
      data = Object.assign(data, { guest: data.guest + 1 });

      window.localStorage.setItem('sleep-data', JSON.stringify(data));
      this.setCurrentParameters();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  decrementGuest() {
    // const currentData = this.payload[this.activeItem];

    if (window.localStorage.getItem('sleep-data')) {
      let data = JSON.parse(window.localStorage.getItem('sleep-data'));
      data = Object.assign(data, {
        guest: data.guest > 1 ? data.guest - 1 : 1,
      });

      window.localStorage.setItem('sleep-data', JSON.stringify(data));
      this.setCurrentParameters();
    }
  }
}

const sleep = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $travel = document.getElementById('sleep');

    const slider = new SleepSlider($travel, payload);
    slider.init();
    // slider.sayHi();
  });

export default sleep;
