class Slider {
  constructor(mainElement, payload) {
    this.mainElement = mainElement;
    this.payload = payload || [
      {
        id: 0,
        name: 'Empty slider',
        description: 'No data for current slider',
      },
    ];
    this.isEmpty = !payload;
    this.activeItem = 0;
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

  sayHi() {
    console.log(this.mainElement);
  }

  prev() {
    if (this.activeItem - 1 < 0) {
      this.activeItem = this.payload.length - 1;
    } else if (this.activeItem - 1 >= 0) {
      this.activeItem -= 1;
    }
  }

  next() {
    if (this.activeItem + 1 > this.payload.length - 1) {
      this.activeItem = 0;
    } else {
      this.activeItem += 1;
    }
  }

  activateById(id) {
    this.activeItem = id;
  }
}

export default Slider;
