import LoginWindow from './loginWindow';
import MainWindow from './mainWindow';
import UserName from './userName';
import CounterUsers from './counterUsers';
import UserList from './userList';
import WSClient from './wsClient';
import MessageList from './messageList';
import MessageSender from './messageSender';
import UserPhoto from './userPhoto';

export default class Chat {
  constructor() {
    this.wsClient = new WSClient(`ws://localhost:8081`, this.onMessage.bind(this));

    this.chat = {
      loginWindow: new LoginWindow(
        document.querySelector('.authorization'),
        this.onLogin.bind(this)
      ),
      mainWindow: new MainWindow(document.querySelector('.chat-window')),
      userName: new UserName(document.querySelector('.users__name')),
      counterUsers: new CounterUsers(document.querySelector('.messages__member')),
      userList: new UserList(document.querySelector('.users__list')),
      messageList: new MessageList(document.querySelector('.messages__panel')),
      messageSender: new MessageSender(
        document.querySelector('.messages__panel-input'),
        this.onSend.bind(this)
      ),
      userPhoto: new UserPhoto(
        document.querySelector('[data-role=user-photo]'),
        this.onUpload.bind(this)
      ),
    };

    this.chat.loginWindow.hide();
  }

  onUpload(data) {
    this.chat.userPhoto.set(data);

    fetch('/chat/upload-photo', {
      method: 'post',
      body: JSON.stringify({
        name: this.chat.userName.get(),
        image: data,
      }),
    });
  }

  onSend(message) {
    this.wsClient.sendTextMessage(message);
    this.chat.messageSender.clear();
  }

  async onLogin(name) {
    await this.wsClient.connect();
    this.wsClient.sendHello(name);
    this.chat.loginWindow.show();
    this.chat.mainWindow.hide();
    this.chat.userName.set(name);

    this.chat.userPhoto.set(`/chat/photos/${name}.png?t=${Date.now()}`);
  }

  onMessage({ type, from, data }) {
    if (type === 'hello') {
      this.chat.userList.add(from);
      this.chat.counterUsers.add();
      this.chat.messageList.addSystemMessage(`${from} подключился к чату`);
    } else if (type === 'user-list') {
      for (const item of data) {
        this.chat.userList.add(item);
        this.chat.counterUsers.add();
      }
    } else if (type === 'bye-bye') {
      this.chat.userList.remove(from);
      this.chat.counterUsers.remove();
      this.chat.messageList.addSystemMessage(`${from} покинул чат`);
    } else if (type === 'text-message') {
      this.chat.messageList.add(from, data.message);
    } else if (type === 'photo-changed') {
      const avatars = document.querySelectorAll(
        `[data-role=user-avatar][data-user=${data.name}]`
      );

      for (const avatar of avatars) {
        avatar.style.backgroundImage = `url(/chat/photos/${
          data.name
        }.png?t=${Date.now()})`;
      }
    }
  }
}
