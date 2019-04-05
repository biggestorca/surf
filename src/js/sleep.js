import Slider from './Slider';
// import isNaN from './isNaN';
// import { isIE } from './checkBrowser';
import payload from './sleepData';

class SleepSlider extends Slider {
  init() {
    super.init();
    this.setCurrentResortDestination();
    this.setCurrentResortRating();
    // this.setCurrentAirlineLocationImage();
    // this.setCurrentAirlineParameters();
  }

  updateView() {
    super.updateView();
    this.setCurrentResortDestination();
    this.setCurrentResortRating();
    // this.setCurrentAirlineLocationImage();
    // this.setCurrentAirlineParameters();
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
  }
  setCurrentAirlineLocationImage() {
    const currentData = this.payload[this.activeItem];
    const $elem = this.mainElement.querySelector('#travel__location-image');
    $elem.setAttribute('src', currentData.airlineLocationImage);
  }
  setCurrentAirlineParameters() {
    const currentData = this.payload[this.activeItem];

    const $destination = this.mainElement.querySelector('#travel__destination');
    $destination.innerHTML = `${currentData.city} <br/> ${currentData.country}`;

    const $distance = this.mainElement.querySelector('#travel__distance');
    $distance.innerText = `${currentData.distance} miles`;

    const $time = this.mainElement.querySelector('#travel__time');
    $time.innerHTML = `${(currentData.timeMinutes / 60).toFixed(0)} hours <br/> ${currentData.timeMinutes % 60} minutes`;

    const $pricing = this.mainElement.querySelector('#travel__pricing');
    $pricing.innerText = `$ ${currentData.price} usd`;

    const $round = this.mainElement.querySelector('#round-trip');
    if (currentData.roundTrip) {
      $round.innerText = 'round trip';
    } else {
      $round.innerText = '';
    }
  }
}

const sleep = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $travel = document.getElementById('sleep');

    const slider = new SleepSlider($travel, payload);
    slider.init();
    slider.sayHi();
  });

export default sleep;
