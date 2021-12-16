export default class MessageSender {
  constructor(element, onSend) {
    this.onSend = onSend;

    this.messagesInput = element.querySelector('[data-role=message-text]');
    this.messageButton = element.querySelector('[data-role=messages-add]');

    const sendMessage = () => {
      const message = this.messagesInput.value;

      if (message) {
        this.onSend(message);
      }
    };

    this.messageButton.addEventListener('click', sendMessage);
    this.messagesInput.addEventListener('change', sendMessage);
  }

  clear() {
    this.messagesInput.value = '';
  }
}
