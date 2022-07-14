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

const getRandomArrayElement = (array) => {
  const index = getRandomNumber(0, array.length - 1);

  return array[index];
};

const getUniqueRandomArrayElements = (array, count) => {
  if (array.length < count) {
    throw new Error('Количество элементов не должно превышать длину массива');
  }

  const uniqueRandomElements = [];

  for (let i = 0; i < count; i++) {
    let randomElement = getRandomArrayElement(array);

    while (uniqueRandomElements.includes(randomElement)) {
      randomElement = getRandomArrayElement(array);
    }

    uniqueRandomElements.push(randomElement);
  }

  return uniqueRandomElements;
};

const isMaxLengthValid = (string, maxLength) => (string.length <= maxLength);

const isEscapeKey = (evt) => (evt.key === 'Escape');

const debounce = (cb, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(
      () => cb(...args),
      delay
    );
  };
};

export {
  // getRandomNumber нигде не используется кроме этого модуля
  getRandomNumber,
  // getRandomArrayElement  аналогично
  getRandomArrayElement,
  getUniqueRandomArrayElements,
  isEscapeKey,
  isMaxLengthValid,
  debounce
};
