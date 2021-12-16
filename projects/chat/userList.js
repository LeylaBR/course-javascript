import { sanitize } from './utils';

export default class UserList {
  constructor(element) {
    this.element = element;
    this.items = new Set();
  }

  buildDOM() {
    const fragment = document.createDocumentFragment();

    this.element.innerHTML = '';

    for (const name of this.items) {
      const usersItem = document.createElement('li');
      usersItem.classList.add('users__item');
      usersItem.innerHTML = `
            <div
            style="background-image: url(/chat/photos/${name}.png?t=${Date.now()})" 
            class="users__icon"  data-role="user-avatar" data-user=${sanitize(
              name
            )}></div>
            <div class="users__name">${name}</div>`;

      fragment.append(usersItem);

      this.element.append(fragment);
    }
  }

  add(name) {
    this.items.add(name);
    this.buildDOM();
  }

  remove(name) {
    this.items.delete(name);
    this.buildDOM();
  }
}
