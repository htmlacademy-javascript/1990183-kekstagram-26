import {
  getRandomNumber,
  getRandomArrayElement,
  createUniqueRandomGenerator,
  createCounter
} from './util.js';

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

// Счетчик для идентификаторов постов
const getPostIdCounter = createCounter();
// Счетчик для фотографий
const getPhotoCounter = createCounter();

// Генерирует объект - комментарий
const createComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

// Генерирует объект - пост
const createPost = () => {
  const commentCount = getRandomNumber(1, 5);
  const getCommentId = createUniqueRandomGenerator(0, 1000);

  return {
    id: getPostIdCounter(),
    url: `photos/${getPhotoCounter()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(5, 200),
    comments: Array.from({length: commentCount}, () => createComment(getCommentId())),
  };
};

// Генерирует массив постов
const createPostList = () => Array.from({length: POST_COUNT}, createPost);

export { createPostList };
