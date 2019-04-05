import Slider from './Slider';
// import isNaN from './isNaN';
// import { isIE } from './checkBrowser';
import payload from './travelData';

class SurfSlider extends Slider {
  init() {
    super.init();
    this.setCurrentAirlineDestination();
    this.setCurrentAirlineName();
    this.setCurrentAirlineLocationImage();
    this.setCurrentAirlineParameters();
  }

  updateView() {
    super.updateView();
    this.setCurrentAirlineDestination();
    this.setCurrentAirlineName();
    this.setCurrentAirlineLocationImage();
    this.setCurrentAirlineParameters();
  }

  setCurrentAirlineDestination() {
    const currentAirlineData = this.payload[this.activeItem];
    const currentLocation = this.mainElement.querySelector('#travel-location');
    currentLocation.innerHTML = `${currentAirlineData.name} <span class="divider">|</span> ${
      currentAirlineData.country
    }`;
  }
  setCurrentAirlineName() {
    const currentAirlineData = this.payload[this.activeItem];
    const $airlineName = this.mainElement.querySelector('#travel__airline-name');
    $airlineName.innerText = currentAirlineData.airline;
  }
  setCurrentAirlineLocationImage() {
    const currentAirlineData = this.payload[this.activeItem];
    const $elem = this.mainElement.querySelector('#travel__location-image');
    $elem.setAttribute('src', currentAirlineData.airlineLocationImage);
  }
  setCurrentAirlineParameters() {
    const currentAirlineData = this.payload[this.activeItem];

    const $destination = this.mainElement.querySelector('#travel__destination');
    $destination.innerHTML = `${currentAirlineData.city} <br/> ${currentAirlineData.country}`;

    const $distance = this.mainElement.querySelector('#travel__distance');
    $distance.innerText = `${currentAirlineData.distance} miles`;

    const $time = this.mainElement.querySelector('#travel__time');
    $time.innerHTML = `${(currentAirlineData.timeMinutes / 60).toFixed(0)} hours <br/> ${currentAirlineData.timeMinutes % 60} minutes`;

    const $pricing = this.mainElement.querySelector('#travel__pricing');
    $pricing.innerText = `$ ${currentAirlineData.price} usd`;

    const $round = this.mainElement.querySelector('#round-trip');
    if (currentAirlineData.roundTrip) {
      $round.innerText = 'round trip';
    } else {
      $round.innerText = '';
    }
  }
}

const travel = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $travel = document.getElementById('travel');

    const slider = new SurfSlider($travel, payload);
    slider.init();
  });

export default travel;
