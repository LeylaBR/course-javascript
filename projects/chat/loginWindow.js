export default class LoginWindow {
  constructor(element, onLogin) {
    this.element = element;
    this.onLogin = onLogin;

    this.entryButton = element.querySelector('[data-role=entry-add]');
    this.entryInput = element.querySelector('[data-role=entry-nickname]');

    this.entryError = element.querySelector('.entry__error');

    const transitionChatWindow = () => {
      this.entryError.textContent = '';

      const name = this.entryInput.value;

      if (!name) {
        this.entryError.textContent = 'Введите пожалуйста свой ник';
      } else {
        this.onLogin(name);
      }
    };

    this.entryButton.addEventListener('click', transitionChatWindow);
    this.entryInput.addEventListener('change', transitionChatWindow);
  }

  show() {
    this.element.classList.remove('active');
  }

  hide() {
    this.element.classList.add('active');
  }
}
