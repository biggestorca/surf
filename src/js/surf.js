import Slider from './Slider';
// import isNaN from './isNaN';
// import { isIE, isEDGE } from './checkBrowser';

const payload = [
  {
    id: 0,
    name: 'Malibu Beach',
    country: 'USA',
    city: 'California',
    surfFet: {
      min: 9,
      max: 13,
    },
    tide: '+2.3',
    wind: '4',
  },
];

class SurfSlider extends Slider {
  firstRender() {
    super.firstRender();
    // генерация всех блоков
    // установка активного
    this.generatePlacesOnMap();
    this.generateCards();
  }
  // eslint-disable-next-line class-methods-use-this
  generatePlacesOnMap() {
    // генерация карты
  }
  // eslint-disable-next-line class-methods-use-this
  generateCards() {
    // генерация карточек
  }
  // eslint-disable-next-line class-methods-use-this
  setActivePlaceOnMap() {
    // установка активной точки на карте
    this.deactivatePlaceOnMap();
  }
  // eslint-disable-next-line class-methods-use-this
  deactivatePlaceOnMap() {
    // выключаем активную точку на карте
  }
  // eslint-disable-next-line class-methods-use-this
  getInfoForActivePlaceOnMap() {
    // возвращает сгенерированный блок с данными
    // который всплывает над активированным местом на карте
  }
  // eslint-disable-next-line class-methods-use-this
  setActiveCard() {
    // установка активной карточки
    this.deactivateCard();
  }
  // eslint-disable-next-line class-methods-use-this
  deactivateCard() {
    // выключаем активную карточку
  }
}

const surf = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $surf = document.getElementById('surf');

    const slider = new SurfSlider($surf, payload);
    slider.sayHi();
  });

export default surf;
