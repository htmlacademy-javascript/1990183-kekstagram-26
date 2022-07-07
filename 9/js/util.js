// Возвращает рандомное целое число из положительного диапазона
const getRandomNumber = (from, to) => {
  if (from > to) {
    throw new Error('В диапазоне значение «до» должно быть меньше, чем значение «от»');
  }

  if (from < 0) {
    throw new Error('Диапазон может быть только положительный');
  }

  const randomNumber = Math.random() * (to - from + 1) + from;
  const randomInteger = Math.floor(randomNumber);

  return randomInteger;
};

// Возвращает уникальное рандомное число из диапазона.
// exсeptions - массив с повторными значениями
const getUniqueRandomNumber = (from, to, exсeptions) => {
  const randomInteger = getRandomNumber(from, to);

  if (exсeptions.includes(randomInteger)) {
    return getUniqueRandomNumber(from, to, exсeptions);
  }

  exсeptions.push(randomInteger);

  return randomInteger;
};

// Возвращает рандомный элемент из массива
const getRandomArrayElement = (array) => {
  const index = getRandomNumber(0, array.length - 1);

  return array[index];
};

// Проверяет строку на соответствие максимальной длине
const isMaxLengthValid = (string, maxLength) => (string.length <= maxLength);

// Проверяет нажата ли клавиша Escape
const isEscapeKey = (event) => (event.key === 'Escape');

export {
  getRandomNumber,
  getUniqueRandomNumber,
  getRandomArrayElement,
  isEscapeKey,
  isMaxLengthValid
};
