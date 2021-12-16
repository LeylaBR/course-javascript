import { sanitize } from './utils';

export default class MessageList {
  constructor(element) {
    this.element = element;
  }

  add(from, text) {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, 0);
    const minutes = String(date.getMinutes()).padStart(2, 0);
    const time = `${hours}:${minutes}`;
    const list = document.createElement('div');
    list.classList.add('messages__desc');
    list.innerHTML = `
      <div
      style="background-image: url(/chat/photos/${from}.png?t=${Date.now()})"
      class="messages__avatar" data-role="user-avatar" data-user=${sanitize(from)}>
        </div>
      <div class="messages__block">
        <div class="messages__name-user">${sanitize(from)}</div>
        <div class="messages__text">${sanitize(text)}<span>${time}</span></div>
      </div>
    `;
    this.element.append(list);
    this.element.scrollTop = this.element.scrollHeight;
  }

  addSystemMessage(message) {
    const item = document.createElement('li');

    item.classList.add('message-item-system');

    item.textContent = message;
    this.element.append(item);

    this.element.scrollTop = this.element.scrollHeight;
  }
}
