export default class MainWindow {
  constructor(element) {
    this.element = element;
  }

  show() {
    this.element.classList.remove('active');
  }

  hide() {
    this.element.classList.add('active');
  }
}
