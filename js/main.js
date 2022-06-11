const POST_COUNT = 25;

const DESCRIPTIONS = [
  'Объятия амврозии',
  'Шепот морского конька',
  'Аромат скипидара',
  'Вскружи ажитацию',
  'Любовь жожоба',
  'Добей окно в Европу',
  'Комбинаторное рвение',
  'Системологическое поле',
  'Вскружи природу гамма-всплесков',
  'Структурный блеск',
];

const NAMES = [
  'Флоренсия',
  'Алехандро',
  'Роберто',
  'Хуан',
  'Серхио',
  'Гвадалупе',
  'Карлос',
  'Эдуардо',
  'Сесилия',
  'Педро',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

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
// exeptions - массив с повторными значениями
const getUniqueRandomNumber = (from, to, exeptions) => {
  const randomInteger = getRandomNumber(from, to);

  if (exeptions.includes(randomInteger)) {
    return getUniqueRandomNumber(from, to, exeptions);
  }

  exeptions.push(randomInteger);

  return randomInteger;
};

// Возвращает рандомный элемент из массива
const getRandomArrayElement = (array) => {
  const index = getRandomNumber(0, array.length - 1);

  return array[index];
};

// Счетчик, работающий на замыкании
const createCounter = () => {
  let i = 1;

  return () => i++;
};

// Счетчик для идентификаторов постов
const getPostIdCounter = createCounter();
// Счетчик для фотографий
const getPhotoCounter = createCounter();

// Массив для хранения уникальных идентификаторов комментариев
const ids = [];

// Генерирует объект - комментарий
const createComment = () => ({
  id: getUniqueRandomNumber(0, 1000, ids),
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Генерирует объект - описание к фотографии
const createPost = () => {
  const commentCount = getRandomNumber(1, 5);

  return {
    id: getPostIdCounter(),
    url: `photos/${getPhotoCounter()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(5, 200),
    comments: Array.from({length: commentCount}, createComment),
  };
};

// Генерирует массив постов.
const createPostList = (arrayLength) => Array.from({length: arrayLength}, createPost);

createPostList(POST_COUNT);

// Проверяет строку на соответствие максимальной длине
const isMaxLengthValid = (string, maxLength) => (string.length <= maxLength);

isMaxLengthValid('String', 20);
