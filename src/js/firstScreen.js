import 'whatwg-fetch';
import Slider from './Slider';
import isNaN from './isNaN';
import { isIE, isEDGE } from './checkBrowser';

const ES6Promise = require('es6-promise');

ES6Promise.polyfill();

const payload = [
  {
    id: 0,
    name: 'North Shore',
    hash: 'north-shore',
    condition: 'Radical',
  },
  {
    id: 1,
    name: 'South Shore',
    hash: 'south-shore',
    condition: 'Conservative',
  },
  {
    id: 2,
    name: 'West Shore',
    hash: 'west-shore',
    condition: 'Radical',
  },
  {
    id: 3,
    name: 'East Shore',
    hash: 'east-shore',
    condition: 'Conservative',
  },
];

const computedHeight = (element) => {
  const height = window.innerHeight;

  const allScreenClass = (el, h) => {
    if (h < 1024) {
      el.classList.remove('all-screen-height');
    } else {
      el.classList.add('all-screen-height');
    }
  };

  allScreenClass(element, height);

  document.addEventListener(
    'resize',
    () => {
      const newHeight = window.innerHeight;
      allScreenClass(element, newHeight);
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

// TODO: simply
// TODO: set all functions in methods
// TODO: fix destinationSvg changes when quick slide
class FirstScreenSlider extends Slider {
  constructor(mainEl, data) {
    super(mainEl, data);
    this.generateLocations();
  }

  updateView() {
    super.updateView();
    const data = this.payload[this.activeItem];
    this.mainElement.querySelector('.slider__name').innerText = data.name;
    this.mainElement.querySelector('.slider__condition').innerText = data.condition;
    const directionEl = this.mainElement.querySelector('.slider__direction');

    if (data.condition === 'Radical') {
      directionEl.classList.add('slider__direction--radial');
      directionEl.classList.remove('slider__direction--conservative');
    } else {
      directionEl.classList.add('slider__direction--conservative');
      directionEl.classList.remove('slider__direction--radial');
    }

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
    this.buildPath();
  }

  buildPath() {
    if (!isNaN(this.prevActiveItem)) {
      const oldSvg = this.mainElement.querySelector(`#svg-path-${this.payload[this.prevActiveItem].hash}`);

      if (isIE()) {
        let classList = oldSvg.getAttribute('class').split(' ');
        classList = classList.filter(className => className !== 'svg-path-active');
        oldSvg.setAttribute('class', classList.join(' '));
      } else {
        oldSvg.classList.remove('svg-path-active');
      }
    }

    const { hash, name } = this.payload[this.activeItem];
    const svg = this.mainElement.querySelector(`#svg-path-${hash}`);
    if (isIE()) {
      const classList = svg.getAttribute('class');
      svg.setAttribute('class', `${classList} svg-path-active`);
    } else {
      svg.classList.add('svg-path-active');
    }

    const svgLine = svg.querySelector('path');
    const svgDestination = this.mainElement.querySelector(`#svg-destination-${hash}`);

    const disactivateDestination = (elem) => {
      elem.setAttribute('width', '6');
      elem.setAttribute('height', '6');
      elem.setAttribute('viewBox', '0 0 6 6');
      const newDestinationPath = elem.querySelector('path');
      newDestinationPath.setAttribute(
        'd',
        'M3 6C4.65685 6 6 4.65685 6 3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6Z',
      );

      const $destinationNames = Array.prototype.slice.call(
        document.querySelectorAll('.destination-name'),
        0,
      );

      if ($destinationNames.length > 0) {
        $destinationNames.forEach((destinationName) => {
          destinationName.classList.add('remove');
          setTimeout(() => destinationName.parentNode.removeChild(destinationName), 1000);
        });
      }
    };

    const activateDestination = (elem) => {
      elem.setAttribute('width', '13');
      elem.setAttribute('height', '13');
      elem.setAttribute('viewBox', '0 0 13 13');
      const newDestinationPath = elem.querySelector('path');
      newDestinationPath.setAttribute(
        'd',
        'M6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13Z',
      );
    };

    const createDestionationName = (destination) => {
      const destinationName = document.createElement('div');
      destinationName.innerText = `${name} | Malibu, CA`;
      destinationName.classList.add('destination-name');
      destinationName.style.position = 'absolute';
      const computedElemStyle = window.getComputedStyle(destination, null);
      destinationName.style.top = `${+computedElemStyle.getPropertyValue('top').slice(0, -2) -
        6}px`;
      destinationName.style.right = `${+computedElemStyle.getPropertyValue('right').slice(0, -2) +
        24}px`;

      document.querySelector('.slider__path').insertBefore(destinationName, destination);
    };

    const createAnim = (len) => {
      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');

      animate.setAttribute('attributeName', 'stroke-dashoffset');
      animate.setAttribute('begin', 'indefinite');
      animate.setAttribute('dur', '2s');
      animate.setAttribute('repeatCount', '1');
      animate.setAttribute('fill', 'freeze');
      animate.setAttribute('calcMode', 'linear');
      animate.setAttribute('values', `${len};0`);
      return animate;
    };

    if (!isNaN(this.prevActiveItem)) {
      const oldItemHash = this.payload[this.prevActiveItem].hash;
      disactivateDestination(this.mainElement.querySelector(`#svg-destination-${oldItemHash}`));
    }

    if (isIE() || isEDGE()) {
      activateDestination(svgDestination);
    } else {
      const len = Math.round(svgLine.getTotalLength());
      svgLine.setAttribute('stroke-dasharray', len);
      svgLine.setAttribute('stroke-dashoffset', len);

      const animate = createAnim(len);

      svgLine.appendChild(animate);
      animate.beginElement();

      setTimeout(() => {
        activateDestination(svgDestination);
      }, 2100);
    }
    createDestionationName(svgDestination);
  }

  generateLocations() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('slider__location-wrapper');

    this.payload.forEach((payloadElem, i) => {
      const item = document.createElement('div');
      item.classList.add('slider__location-item');
      item.setAttribute('data-id', i);

      const itemCount = document.createElement('div');
      itemCount.classList.add('slider__location-item-count');

      const itemName = document.createElement('div');
      itemName.classList.add('slider__location-item-name');

      itemCount.innerText = i < 9 ? `0${payloadElem.id + 1}` : payloadElem.id + 1;
      itemName.innerText = payloadElem.name;

      item.appendChild(itemCount);
      item.appendChild(itemName);

      item.addEventListener('click', () => this.activateById(i));

      wrapper.appendChild(item);
    });

    this.mainElement.querySelector('.slider__content').appendChild(wrapper);
  }
}

const firstScreen = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $firstScreen = document.getElementById('first-screen');
    computedHeight($firstScreen);
    getUserGeolocation();

    const firstScreenSlider = new FirstScreenSlider($firstScreen, payload);
    firstScreenSlider.activateById(0);

    if (isIE()) {
      $firstScreen.querySelector('.slider__content').classList.add('slider__content--ie');
    }
  });

export default firstScreen;
