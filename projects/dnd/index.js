/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
const addDivButton = homeworkContainer.querySelector('#addDiv');

function elementMovement(elem) {
  elem.addEventListener('mousedown', (event) => {
    move(event.pageX, event.pageY);

    function move(pageX, pageY) {
      elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
      elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
    }

    function onMouseMove(event) {
      move(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    elem.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    });
  });
}

export function createDiv() {
  const newDiv = document.createElement('div');
  newDiv.classList.add('draggable-div');
  newDiv.style.width = Math.floor(Math.random() * 100 + 1) + 'px';
  newDiv.style.height = Math.floor(Math.random() * 100 + 1) + 'px';
  newDiv.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  newDiv.style.left = Math.floor(Math.random() * 100 + 1) + 'px';
  newDiv.style.top = Math.floor(Math.random() * 100 + 1) + 'px';
  elementMovement(newDiv);
  return newDiv;
}

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
