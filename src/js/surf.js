import Slider from './Slider';

const payload = [
  {
    id: 0,
    name: 'Malibu Beach',
    hash: 'malibu-beach',
    country: 'USA',
    city: 'California',
    surfFet: {
      min: 5,
      max: 10,
    },
    tide: '+3.3',
    wind: '5',
  },
  {
    id: 1,
    name: 'Airlie Beach',
    hash: 'airlie-beach',
    country: 'Australia',
    city: 'Queensland',
    surfFet: {
      min: 9,
      max: 13,
    },
    tide: '+2.3',
    wind: '4',
  },
  {
    id: 2,
    name: 'Cloud Nine',
    hash: 'cloud-nine',
    country: 'Philippines',
    city: 'Siargao',
    surfFet: {
      min: 4,
      max: 8,
    },
    tide: '+1.8',
    wind: '6',
  },
  {
    id: 3,
    name: 'Vieux Boucau',
    hash: 'vieux-boucau',
    country: 'France',
    city: 'Hossegor',
    surfFet: {
      min: 6,
      max: 10,
    },
    tide: '+5.2',
    wind: '8',
  },
];

class SurfSlider extends Slider {
  init() {
    super.init();

    this.setCurrentLocation();
    // генерация всех блоков
    this.generatePlacesOnMap();
    this.generateCards();
    // установка активного
    this.setActivePlaceOnMap();
    this.setActiveCard();
  }

  updateView() {
    super.updateView();
    this.setCurrentLocation();
    this.setActivePlaceOnMap();
    this.setActiveCard();
  }

  generatePlacesOnMap() {
    // генерация карты
    const map = this.mainElement.querySelector('.map');

    this.payload.forEach((surfItem) => {
      const place = document.createElement('div');
      place.classList.add('surf-place');
      place.classList.add(`surf-place--${surfItem.hash}`);
      place.setAttribute('id', `surf-place-${surfItem.hash}`);
      place.setAttribute('data-hash', surfItem.hash);

      place.addEventListener(
        'click',
        () => {
          this.activateById(surfItem.id);
        },
        false,
      );
      map.appendChild(place);
    });
  }

  generateCards() {
    // генерация карточек
    const cardList = this.mainElement.querySelector('#card__list');
    this.payload.forEach((surfItem) => {
      const card = this.generateCard(surfItem);
      card.addEventListener(
        'click',
        () => {
          this.activateById(surfItem.id);
        },
        false,
      );
      cardList.appendChild(card);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  generateCard(surfItem) {
    const card = document.createElement('div');
    card.classList.add('card__item');
    card.classList.add(`card__item--${surfItem.hash}`);
    card.setAttribute('id', `card__item-${surfItem.hash}`);
    card.setAttribute('data-hash', surfItem.hash);
    card.style.zIndex = surfItem.id;

    const name = document.createElement('div');
    name.classList.add('card__name');
    name.innerText = surfItem.name;
    card.appendChild(name);

    const locations = document.createElement('div');
    locations.classList.add('card__locations');
    locations.innerText = `${surfItem.city} | ${surfItem.country}`;
    card.appendChild(locations);

    const hero = document.createElement('div');
    hero.classList.add('hero');
    hero.innerHTML = `
            View<span
              >Surf
              <svg
                width="25"
                height="21"
                viewBox="0 0 25 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8668 19.5873L24.0804 11.4365C24.8328 10.6854 24.8328 9.46618 24.0804 8.71755L15.8668 0.561937C15.1081 -0.189203 13.88 -0.185434 13.1214 0.561937C12.3702 1.31433 12.3702 2.52853 13.1214 3.28093L17.9265 8.04835L2.5123 8.04835C1.39879 8.04835 0.497906 8.94798 0.497906 10.0615C0.497906 11.1737 1.39879 12.0746 2.5123 12.0746L17.9555 12.0746L13.1214 16.8672C12.3702 17.6183 12.3702 18.8338 13.1214 19.5849C13.8788 20.3373 15.1068 20.3386 15.8668 19.5874V19.5873Z"
                  fill="white"
                />
              </svg>
            </span>`;
    card.appendChild(hero);

    return card;
  }

  setActivePlaceOnMap() {
    // установка активной точки на карте
    const $placesList = Array.prototype.slice.call(
      this.mainElement.querySelectorAll('.surf-place'),
      0,
    );
    $placesList.forEach((place) => {
      if (place.getAttribute('data-hash') === this.payload[this.activeItem].hash) {
        place.classList.add('surf-place--active');
        const icon = this.getActivePlaceIcon();
        const tooltip = this.getActivePlaceInfoTooltip(this.payload[this.activeItem]);
        place.appendChild(icon);
        place.appendChild(tooltip);
      } else {
        this.deactivatePlaceOnMap(place);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getActivePlaceIcon() {
    const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const svgAttrList = [
      {
        name: 'width',
        value: '24',
      },
      {
        name: 'height',
        value: '33',
      },
      {
        name: 'viewBox',
        value: '0 0 24 33',
      },
      {
        name: 'fill',
        value: 'none',
      },
      {
        name: 'xmlns',
        value: 'http://www.w3.org/2000/svg',
      },
    ];
    const pathAttrList = [
      {
        name: 'fill-rule',
        value: 'evenodd',
      },
      {
        name: 'clip-rule',
        value: 'evenodd',
      },
      {
        name: 'd',
        value:
          'M0 21C0 27.6274 5.37258 33 12 33C18.6274 33 24 27.6274 24 21C24 14.3726 12 0 12 0C12 0 0 14.3726 0 21Z',
      },
      {
        name: 'fill',
        value: '#4AF6CD',
      },
    ];

    svgAttrList.forEach((attr) => {
      iconSvg.setAttribute(attr.name, attr.value);
    });
    pathAttrList.forEach((attr) => {
      iconPath.setAttribute(attr.name, attr.value);
    });

    iconSvg.appendChild(iconPath);

    return iconSvg;
  }

  // eslint-disable-next-line class-methods-use-this
  getActivePlaceInfoTooltip(placeData) {
    const tooltip = document.createElement('div');
    tooltip.classList.add('surf-place__tooltip');

    const top = document.createElement('div');
    top.classList.add('top');

    const name = document.createElement('div');
    name.classList.add('name');
    name.innerText = placeData.name;

    const country = document.createElement('div');
    country.classList.add('country');
    country.innerText = placeData.country;

    const infoData = [
      {
        img: {
          src: '/img/icons/Surf.svg',
          alt: 'surf set',
        },
        val: `${placeData.surfFet.min} - ${placeData.surfFet.max}`,
        explain: 'Surf (FT)',
      },
      {
        img: {
          src: '/img/icons/Water.svg',
          alt: 'tide',
        },
        val: placeData.tide,
        explain: 'Tide (FT)',
      },
      {
        img: {
          src: '/img/icons/Wind.svg',
          alt: 'wind',
        },
        val: `${placeData.wind} SE`,
        explain: 'Wind (KTS)',
      },
    ];
    const info = this.getTooltipInfo(infoData);

    top.appendChild(name);
    tooltip.appendChild(top);
    tooltip.appendChild(country);
    tooltip.appendChild(info);

    return tooltip;
  }

  // eslint-disable-next-line class-methods-use-this
  getTooltipInfo(data) {
    const info = document.createElement('div');
    info.classList.add('info');

    data.forEach((dataItem) => {
      const item = document.createElement('div');
      item.classList.add('info-item');

      const img = document.createElement('img');
      img.setAttribute('src', dataItem.img.src);
      img.setAttribute('alt', dataItem.img.alt);

      const val = document.createElement('div');
      val.classList.add('info-item__val');
      val.innerText = dataItem.val;

      const explain = document.createElement('div');
      explain.classList.add('info-item__explain');
      explain.innerText = dataItem.explain;

      item.appendChild(img);
      item.appendChild(val);
      item.appendChild(explain);

      info.appendChild(item);
    });

    return info;
  }

  // eslint-disable-next-line class-methods-use-this
  deactivatePlaceOnMap(item) {
    // выключаем активную точку на карте
    item.classList.remove('surf-place--active');
    const icon = item.querySelector('svg');
    const tooltip = item.querySelector('.surf-place__tooltip');

    const isNeededItem = icon && tooltip;

    if (isNeededItem) {
      item.removeChild(icon);
      item.removeChild(tooltip);
    }
  }

  setActiveCard() {
    // установка активной карточки
    const $cardsList = Array.prototype.slice.call(
      this.mainElement.querySelectorAll('.card__item'),
      0,
    );
    $cardsList.forEach((card) => {
      if (card.getAttribute('data-hash') === this.payload[this.activeItem].hash) {
        card.classList.add('card__item--active');
      } else {
        this.deactivateCard(card);
      }
    });
  }
  // eslint-disable-next-line class-methods-use-this
  deactivateCard(item) {
    // выключаем активную карточку
    item.classList.remove('card__item--active');
  }

  setCurrentLocation() {
    const currentActiveItemData = this.payload[this.activeItem];
    const currentLocation = this.mainElement.querySelector('#surf-current-location');
    currentLocation.innerHTML = `${currentActiveItemData.city} <span class="divider">|</span> ${
      currentActiveItemData.country
    }`;
  }
}

const surf = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $surf = document.getElementById('surf');

    const slider = new SurfSlider($surf, payload);
    slider.init();
  });

export default surf;
