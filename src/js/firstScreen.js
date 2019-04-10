import Slider from './Slider';
import isNaN from './isNaN';
import { isIE, isEDGE } from './checkBrowser';
import payload from './firstScreenData';

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

class FirstScreenSlider extends Slider {
  init() {
    super.init();
    this.generateLocations();
    this.updateView();
  }

  updateView() {
    super.updateView();
    this.setCurrentInfo();
    this.cleanPath();
    this.disactivateDestination();
    this.activatePath();
    this.activateDestinationLabel();
    this.cleanLocations();
  }

  setCurrentInfo() {
    const data = this.payload[this.activeItem];
    const name = this.mainElement.querySelector('#slider__name');
    const condition = this.mainElement.querySelector('#slider__condition');
    const directionEl = this.mainElement.querySelector('#slider__direction');

    name.classList.remove('animation__appear--on');
    condition.classList.remove('animation__appear--on');

    directionEl.classList.remove('animation__fade-in-right--on');
    directionEl.classList.remove('animation__fade-in-left--on');
    directionEl.classList.remove('animation__fade-in-right');
    directionEl.classList.remove('animation__fade-in-left');
    if (data.condition === 'Radical') {
      directionEl.classList.add('animation__fade-in-left');
    } else {
      directionEl.classList.add('animation__fade-in-right');
    }

    name.innerText = data.name;
    condition.innerText = data.condition;
    setInterval(() => {
      name.classList.add('animation__appear--on');
      condition.classList.add('animation__appear--on');
    }, 750);

    if (data.condition === 'Radical') {
      directionEl.classList.add('slider__direction--radial');
      directionEl.classList.remove('slider__direction--conservative');
      directionEl.classList.add('animation__fade-in-left--on');
    } else {
      directionEl.classList.add('slider__direction--conservative');
      directionEl.classList.remove('slider__direction--radial');
      directionEl.classList.add('animation__fade-in-right--on');
    }
  }

  activatePath() {
    const { hash } = this.payload[this.activeItem];
    const svg = this.mainElement.querySelector(`#svg-path-${hash}`);
    const svgLine = svg.querySelector('path');

    const createSvgAnimate = (len) => {
      const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');

      animate.setAttribute('attributeName', 'stroke-dashoffset');
      animate.setAttribute('begin', 'indefinite');
      animate.setAttribute('dur', '1s');
      animate.setAttribute('repeatCount', '1');
      animate.setAttribute('fill', 'freeze');
      animate.setAttribute('calcMode', 'linear');
      animate.setAttribute('values', `${len};0`);
      return animate;
    };

    if (isIE() || isEDGE()) {
      this.activateDestination();
      const classList = svg.getAttribute('class');
      svg.setAttribute('class', `${classList} svg-path-active`);
    } else {
      const len = Math.round(svgLine.getTotalLength());
      svgLine.setAttribute('stroke-dasharray', len);
      svgLine.setAttribute('stroke-dashoffset', len);

      const animate = createSvgAnimate(len);

      svg.classList.add('svg-path-active');
      svgLine.appendChild(animate);
      animate.beginElement();

      setTimeout(() => {
        this.activateDestination();
      }, 500);
    }
  }

  cleanPath() {
    if (!isNaN(this.prevActiveItem)) {
      const { hash } = this.payload[this.prevActiveItem];
      const oldSvg = this.mainElement.querySelector(`#svg-path-${hash}`);

      // ie11 does not support classList at svg elements
      if (isIE()) {
        let classList = oldSvg.getAttribute('class').split(' ');
        classList = classList.filter(className => className !== 'svg-path-active');
        oldSvg.setAttribute('class', classList.join(' '));
      } else {
        oldSvg.classList.remove('svg-path-active');
      }
    }
  }

  activateDestination() {
    const { hash } = this.payload[this.activeItem];
    const elem = this.mainElement.querySelector(`#svg-destination-${hash}`);
    elem.setAttribute('width', '13');
    elem.setAttribute('height', '13');
    elem.setAttribute('viewBox', '0 0 13 13');
    const newDestinationPath = elem.querySelector('path');
    newDestinationPath.setAttribute(
      'd',
      'M6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13Z',
    );
  }

  activateDestinationLabel() {
    const { hash, name } = this.payload[this.activeItem];
    const elem = this.mainElement.querySelector(`#svg-destination-${hash}`);
    const destinationLabel = this.mainElement.querySelector('#label-destination');

    if (!isNaN(this.prevActiveItem)) {
      destinationLabel.classList.remove('animation__appear--on');
    }

    destinationLabel.innerHTML = `${name} | Malibu, CA`;
    destinationLabel.style.position = 'absolute';
    const computedElemStyle = window.getComputedStyle(elem, null);
    destinationLabel.style.top = `${+computedElemStyle.getPropertyValue('top').slice(0, -2) - 6}px`;
    destinationLabel.style.right = `${+computedElemStyle.getPropertyValue('right').slice(0, -2) +
      24}px`;
    setTimeout(() => {
      destinationLabel.classList.add('animation__appear--on');
    }, 500);
  }

  disactivateDestination() {
    if (!isNaN(this.prevActiveItem)) {
      const { hash } = this.payload[this.prevActiveItem];
      const elem = this.mainElement.querySelector(`#svg-destination-${hash}`);
      elem.setAttribute('width', '6');
      elem.setAttribute('height', '6');
      elem.setAttribute('viewBox', '0 0 6 6');
      const newDestinationPath = elem.querySelector('path');
      newDestinationPath.setAttribute(
        'd',
        'M3 6C4.65685 6 6 4.65685 6 3C6 1.34315 4.65685 0 3 0C1.34315 0 0 1.34315 0 3C0 4.65685 1.34315 6 3 6Z',
      );
    }
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

  cleanLocations() {
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
}

const firstScreen = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $firstScreen = document.getElementById('first-screen');
    computedHeight($firstScreen);
    getUserGeolocation();

    const firstScreenSlider = new FirstScreenSlider($firstScreen, payload);
    firstScreenSlider.init();

    if (isIE()) {
      $firstScreen.querySelector('.slider__content').classList.add('slider__content--ie');
    }
  });

export default firstScreen;
