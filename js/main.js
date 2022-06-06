const getRandomNumber = (from, to) => {
  if (from < 0 || from > to) {
    throw new Error('Диапазон может быть только положительный, а значение «до» меньше, чем значение «от»');
  }

  const randomNumber = Math.random() * (to - from + 1) + from;
  const randomInteger = Math.floor(randomNumber);

  return randomInteger;
};

const isMaxLengthValid = (string, maxLength) => (string.length <= maxLength);

getRandomNumber(10, 15);
isMaxLengthValid('My string', 20);
