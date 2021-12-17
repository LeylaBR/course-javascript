export default class CounterUsers {
  constructor(element) {
    this.element = element;
    this.counter = 0;
  }

  counterUsers() {
    this.element.innerHTML = '';

    if (this.counter % 10 == 1) {
      this.element.textContent = `${this.counter} участник`;
    } else if (this.counter % 10 <= 4) {
      this.element.textContent = `${this.counter} участника`;
    } else {
      this.element.textContent = `${this.counter} участников`;
    }
  }

  add() {
    this.counter += 1;
    this.counterUsers();
  }

  remove() {
    this.counter -= 1;
    this.counterUsers();
  }
}
