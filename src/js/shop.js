import Slider from './Slider';
import payload from './shopData';

class ShopSlider extends Slider {
  init() {
    super.init();
    this.setCurrentInfo();
    this.setCurrentItemImage();
    this.setExtras();
    this.generateFeatures();
  }

  updateView() {
    super.updateView();
    this.setCurrentInfo();
    this.setCurrentItemImage();
    this.setExtras();
    this.generateFeatures();
  }

  setCurrentInfo() {
    const data = this.payload[this.activeItem];

    const name = this.mainElement.querySelector('#shop-item-name');
    name.innerText = data.name;

    this.setCurrentResortRating();

    const price = this.mainElement.querySelector('#shop-item-price');
    const sup = data.price.toString().slice(-2);

    // eslint-disable-next-line no-bitwise
    price.innerHTML = `$ ${data.price ^ 0} <sup>${sup}</sup>`;
  }

  setCurrentResortRating() {
    const currentData = this.payload[this.activeItem];
    const $itemRating = this.mainElement.querySelector('#shop-item-rating');

    if ($itemRating.querySelectorAll('svg')) {
      const $stars = Array.prototype.slice.call($itemRating.querySelectorAll('svg'), 0);
      $stars.forEach((star) => {
        star.parentNode.removeChild(star);
      });
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

      $itemRating.appendChild(star);
    }
  }

  setCurrentItemImage() {
    const data = this.payload[this.activeItem];
    const img = this.mainElement.querySelector('#shop-item-img-active');
    img.setAttribute('src', data.locationImage);
  }

  setExtras() {
    const data = this.payload[this.activeItem].extras;
    const $list = this.mainElement.querySelector('#shop-extras-list');

    if ($list.querySelectorAll('.shop__extras-item')) {
      const $items = Array.prototype.slice.call($list.querySelectorAll('.shop__extras-item'), 0);
      $items.forEach((item) => {
        item.parentNode.removeChild(item);
      });
    }

    data.forEach((extrasItem) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('shop__extras-item');

      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('shop__extras-img-wrapper');
      const img = document.createElement('img');
      img.classList.add('shop__extras-img');
      img.setAttribute('src', extrasItem.locationImage);
      img.setAttribute('alt', 'extra item');
      imgWrapper.appendChild(img);
      wrapper.appendChild(imgWrapper);

      const name = document.createElement('div');
      name.classList.add('shop__extras-name');
      name.innerText = extrasItem.name;
      wrapper.appendChild(name);

      const price = document.createElement('div');
      price.classList.add('shop__extras-price');
      price.innerText = `$ ${extrasItem.price}`;
      wrapper.appendChild(price);
      $list.appendChild(wrapper);
    });
  }

  generateFeatures() {
    const data = this.payload[this.activeItem].features;
    const destination = this.mainElement.querySelector('#shop-item-active');

    if (destination.querySelectorAll('.feature')) {
      const $items = Array.prototype.slice.call(destination.querySelectorAll('.feature'), 0);
      $items.forEach((item) => {
        const btn = item.querySelector('.feature__button');
        btn.removeEventListener('click', () => {});
        item.parentNode.removeChild(item);
      });
    }

    data.forEach((feature) => {
      const featureWrapper = document.createElement('div');
      featureWrapper.classList.add('feature');
      featureWrapper.setAttribute('data-is-open', 'false');

      const featureBtn = document.createElement('button');
      featureBtn.classList.add('feature__button');
      featureBtn.innerText = 'plus';
      featureWrapper.appendChild(featureBtn);
      featureBtn.addEventListener(
        'click',
        () => {
          if (featureWrapper.getAttribute('data-is-open') === 'false') {
            featureWrapper.setAttribute('data-is-open', 'true');
            featureWrapper.classList.add('open');
            featureBtn.innerText = 'minus';
          } else {
            featureWrapper.setAttribute('data-is-open', 'false');
            featureWrapper.classList.remove('open');
            featureBtn.innerText = 'plus';
          }
        },
        false,
      );

      const featureText = document.createElement('p');
      featureText.classList.add('feature__text');
      featureText.innerText = feature.title;
      featureWrapper.appendChild(featureText);

      destination.appendChild(featureWrapper);
    });
  }
}

const shop = () =>
  document.addEventListener('DOMContentLoaded', () => {
    const $shop = document.getElementById('shop');

    const slider = new ShopSlider($shop, payload);
    slider.init();
  });

export default shop;
