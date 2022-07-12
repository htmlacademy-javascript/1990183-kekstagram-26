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

const getUniqueRandomNumber = (from, to, exceptions) => {
  const randomInteger = getRandomNumber(from, to);

  if (exceptions.includes(randomInteger)) {
    return getUniqueRandomNumber(from, to, exceptions);
  }

  exceptions.push(randomInteger);

  return randomInteger;
};

const getRandomArrayElement = (array) => {
  const index = getRandomNumber(0, array.length - 1);

  return array[index];
};

const isMaxLengthValid = (string, maxLength) => (string.length <= maxLength);

const isEscapeKey = (evt) => (evt.key === 'Escape');

export {
  getRandomNumber,
  getUniqueRandomNumber,
  getRandomArrayElement,
  isEscapeKey,
  isMaxLengthValid
};
