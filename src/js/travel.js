import Slider from './Slider';
import isNaN from './isNaN';
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
    if (!isNaN(this.prevActiveItem)) {
      currentLocation.classList.remove('animation__appear--on');
    }

    currentLocation.innerHTML = `${currentAirlineData.name} <span class="divider">|</span> ${
      currentAirlineData.country
    }`;

    setTimeout(() => {
      currentLocation.classList.add('animation__appear--on');
    }, 500);
  }
  setCurrentAirlineName() {
    const currentAirlineData = this.payload[this.activeItem];
    const $airlineName = this.mainElement.querySelector('#travel__airline-name');
    if (!isNaN(this.prevActiveItem)) {
      $airlineName.classList.remove('animation__appear--on');
    }
    $airlineName.innerText = currentAirlineData.airline;
    setTimeout(() => {
      $airlineName.classList.add('animation__appear--on');
    }, 500);
  }
  setCurrentAirlineLocationImage() {
    const currentAirlineData = this.payload[this.activeItem];
    const $elem = this.mainElement.querySelector('#travel__location-image');
    if (!isNaN(this.prevActiveItem)) {
      $elem.classList.remove('animation__appear--on');
    }
    $elem.setAttribute('src', currentAirlineData.airlineLocationImage);

    setTimeout(() => {
      $elem.classList.add('animation__appear--on');
    }, 100);
  }
  setCurrentAirlineParameters() {
    const currentAirlineData = this.payload[this.activeItem];

    const $destination = this.mainElement.querySelector('#travel__destination');
    const $distance = this.mainElement.querySelector('#travel__distance');
    const $time = this.mainElement.querySelector('#travel__time');
    const $pricing = this.mainElement.querySelector('#travel__pricing');
    const $round = this.mainElement.querySelector('#round-trip');

    if (!isNaN(this.prevActiveItem)) {
      $destination.classList.remove('animation__appear--on');
      $distance.classList.remove('animation__appear--on');
      $time.classList.remove('animation__appear--on');
      $pricing.classList.remove('animation__appear--on');
      $round.classList.remove('animation__fade-in-right--on');
    }

    $destination.innerHTML = `${currentAirlineData.city} <br/> ${currentAirlineData.country}`;
    $distance.innerText = `${currentAirlineData.distance} miles`;
    $time.innerHTML = `${(currentAirlineData.timeMinutes / 60).toFixed(0)} hours <br/> ${currentAirlineData.timeMinutes % 60} minutes`;
    $pricing.innerText = `$ ${currentAirlineData.price} usd`;
    if (currentAirlineData.roundTrip) {
      $round.innerText = 'round trip';
    } else {
      $round.innerText = '';
    }

    setTimeout(() => {
      $destination.classList.add('animation__appear--on');
      $distance.classList.add('animation__appear--on');
      $time.classList.add('animation__appear--on');
      $pricing.classList.add('animation__appear--on');
      $round.classList.add('animation__fade-in-right--on');
    }, 250);
  }
}

const travel = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $travel = document.getElementById('travel');

    const slider = new SurfSlider($travel, payload);
    slider.init();
  });

export default travel;
