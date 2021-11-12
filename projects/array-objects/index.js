/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
const forEach = (array, fn) => {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
};

forEach([1, 2, 3], (el) => console.log(el));

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
const map = (array, fn) => {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    res.push(fn(array[i], i, array));
  }
  return res;
};

map([1, 2, 3], (el) => el ** 2);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
const reduce = (array, fn, initial) => {
  let result = initial ?? array[0];
  const startFrom = initial ? 0 : 1;
  for (let i = startFrom; i < array.length; i++) {
    result = fn(result, array[i], i, array);
  }
  return result;
};

reduce([1, 2, 3], (all, current) => all + current);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
const upperProps = (obj) => {
  const res = [];
  for (const key in obj) {
    res.push(key.toUpperCase());
  }
  return res;
};

upperProps({ name: 'Сергей', lastName: 'Петров' });

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
const createProxy = (obj) => {
  obj = new Proxy(obj, {
    set(target, prop, val) {
      target[prop] = val * val;
      return true;
    },
  });
  return obj;
};

const obj = createProxy({});
obj.foo = 2;
console.log(obj.foo);

export { forEach, map, reduce, upperProps, createProxy };
