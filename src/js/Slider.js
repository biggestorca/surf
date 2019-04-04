const env = process.env.NODE_ENV;

class Slider {
  constructor(mainElement, payload) {
    this.mainElement = mainElement;
    this.payload = payload.map((pa, i) => Object.assign(pa, { active: i === 0 })) || [
      {
        id: 0,
        name: 'Empty slider',
        description: 'No data for current slider',
      },
    ];
    this.isEmpty = !this.payload;

    this.firstRender();
    this.activateButtons();
  }

  firstRender() {
    this.activeItem = 0;
    this.prevActiveItem = NaN;
    this.isFirstRender = true;
  }

  activateButtons() {
    this.prevBtn = this.mainElement.querySelector('.prev');
    this.nextBtn = this.mainElement.querySelector('.next');

    if (this.isEmpty) {
      this.prevBtn.addAttribute('disabled', 'disabled');
      this.nextBtn.addAttribute('disabled', 'disabled');
    } else {
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());
    }
  }

  prev() {
    this.prevActiveItem = this.activeItem;
    if (this.activeItem - 1 < 0) {
      this.activeItem = this.payload.length - 1;
    } else if (this.activeItem - 1 >= 0) {
      this.activeItem -= 1;
    }

    this.updateView();
  }

  next() {
    this.prevActiveItem = this.activeItem;
    if (this.activeItem + 1 > this.payload.length - 1) {
      this.activeItem = 0;
    } else {
      this.activeItem += 1;
    }
    this.updateView();
  }

  activateById(id) {
    if (this.activeItem !== id) {
      this.prevActiveItem = this.activeItem;
      this.activeItem = id;
      this.updateView();
    }
  }

  updateView() {
    if (this.isFirstRender) {
      this.isFirstRender = false;
    }
    this.updateActiveItemInPayload();
  }

  updateActiveItemInPayload() {
    this.payload = this.payload.map((pa, i) =>
      Object.assign(pa, { active: i === this.activeItem }));
  }

  sayHi() {
    if (env === 'production') {
      console.log('Hello from slider');
    } else {
      console.log('html', this.mainElement);
      console.log('payload', this.payload);
      console.log('this', this);
    }
  }
}

export default Slider;
