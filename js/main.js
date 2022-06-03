const getRandomNumber = (from, to) => {
  const isParamsInvalid = (from < 0) || (to < 0) || (from === to);

  if (isParamsInvalid) {
    return null;
  }

  const [ rangeStart, rangeEnd ] = (from < to) ? [from, to] : [to, from];
  const randomNumber = Math.random() * (rangeEnd - rangeStart + 1) + rangeStart;
  const randomInteger = Math.floor(randomNumber);

  return randomInteger;
};

const isMaxLengthValid = (string, maxLength) => (string.length <= maxLength);

getRandomNumber(10, 15);
isMaxLengthValid('My string', 20);
