export default class Chat {
  constructor() {
    const socket = new WebSocket('ws://localhost:8081');

    chatWindow.show();

    let items = new Set();

    const entryButton = document.querySelector('[data-role=entry-add]');
    const entryInput = document.querySelector('[data-role=entry-nickname]');
    const authorization = document.querySelector('.authorization');
    const entryError = document.querySelector('.entry__error');

    const chatWindow = document.querySelector('.chat-window');

    let msgToSend = {
      nickName: null,
      body: null,
      type: null,
    };

    const transitionChatWindow = () => {
      entryError.textContent = '';

      if (!entryInput.value) {
        entryError.textContent = 'Введите пожалуйста свой ник';
      } else {
        authorization.classList.remove('active');
        chatWindow.classList.add('active');
        msgToSend.nickName = entryInput.value;
        msgToSend.type = 'hello';
        items.add(entryInput.value);
        socket.send(JSON.stringify(msgToSend));
      }
    };

    entryButton.addEventListener('click', transitionChatWindow);
    entryInput.addEventListener('change', transitionChatWindow);

    const users = document.querySelector('.users__list');
    const messagesMember = document.querySelector('.messages__member');
    const messagesInput = document.querySelector('[data-role=message-text]');
    const messageButton = document.querySelector('[data-role=messages-add]');
    const messagesList = document.querySelector('.messages__list');

    let userMap = new Map();

    let counter = 0;

    const counterUsers = () => {
      counter += 1;

      if (counter % 10 == 1) {
        messagesMember.textContent = `${counter} участник`;
      } else if (counter % 10 <= 4) {
        messagesMember.textContent = `${counter} участника`;
      } else {
        messagesMember.textContent = `${counter} участников`;
      }
    };

    const createUserLi = (nick) => {
      const usersItem = document.createElement('li');
      const userIcon = document.createElement('div');
      const userName = document.createElement('div');

      usersItem.classList.add('users__item');
      usersItem.appendChild(userIcon);
      userIcon.classList.add('users__icon');
      usersItem.appendChild(userName);
      userName.classList.add('users__name');
      userName.textContent = nick;
      users.appendChild(usersItem);
      msgToSend.type = 'message';
      socket.send(JSON.stringify(msgToSend));
    };

    const usersAdd = (nickname) => {
      if (nickname === undefined) {
        return;
      } else {
        users.innerHTML = '';
        msgToSend.type = 'user';
        socket.send(JSON.stringify(msgToSend));
      }
    };

    const messagesPanel = document.querySelector('.messages__panel');

    const addMessage = (message, nickname) => {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, 0);
      const minutes = String(date.getMinutes()).padStart(2, 0);
      const time = `${hours}:${minutes}`;
      const list = document.createElement('li');
      list.classList.add('messages__desc');

      list.innerHTML = `
    
    <div 
    class="messages__avatar"
    style="background-image: url(projects/chat/img/placeholder.png?t=${Date.now()})" 
    >
      </div>
    <div class="messages__block">
      <div class="messages__name-user">${nickname}</div>
      <div class="messages__text">${message}<span>${time}</span></div>
    </div>
  `;

      messagesList.append(list);

      messagesPanel.scrollTop = messagesPanel.scrollHeight;
    };

    const addSystemMessage = (nickname) => {
      messagesList.textContent = `${nickname} подключился к чату`;
    };

    const addSystemMessageClose = (nickname) => {
      messagesList.textContent = `${nickname}  покинул чат`;
    };

    socket.addEventListener('message', function (e) {
      const mas = JSON.parse(e.data);

      if (mas.type === 'hello') {
        usersAdd(mas.nickName);
        addSystemMessage(mas.nickName);

        counterUsers();
      } else if (mas.type === 'message' && mas.body !== null) {
        addMessage(mas.body, mas.nickName);
      } else if (mas.type === 'user') {
        createUserLi(mas.nickName);
      } else if (mas.type === 'close') {
        addSystemMessageClose(mas.nickName);
      }
    });

    function sendMessage() {
      if (messagesInput.value) {
        msgToSend.body = messagesInput.value;

        socket.send(JSON.stringify(msgToSend));

        messagesInput.value = '';
      }
    }

    messageButton.addEventListener('click', sendMessage);
    messagesInput.addEventListener('change', sendMessage);

    socket.addEventListener('close', function (e) {
      msgToSend.type = 'close';
      socket.send(JSON.stringify(msgToSend));
    });

    socket.addEventListener('error', function (e) {
      alert('Соединение закрыто или не может быть открыто');
    });
  }
}

// server

const fs = require('fs');
const path = require('path');
const http = require('http');
const { Server } = require('ws');

const WebSocketServer = new require('ws');

var clients = new Map();
let currentId = 1;

let all = [];

const webSocketServer = new WebSocketServer.Server({ port: 8081 }, () => {
  console.log('Сервер запущен на порту 8081');
});

webSocketServer.on('connection', function (ws) {
  const id = currentId++;

  console.log('новое соединение ' + id);

  console.log(ws);

  ws.on('message', function (message, isBinary) {
    console.log('получено сообщение ' + isBinary);
    console.log('получено сообщение ' + message);

    let obj = JSON.parse(message);

    let nick = obj.nickName;

    all.push(obj);

    console.log(all);

    clients.set(nick, ws);

    clients.forEach((value) => {
      value.send(JSON.stringify(obj));
    });
  });

  ws.on('close', function () {
    console.log('соединение закрыто ' + id);

    clients.delete(ws);
  });
});
