import { toggleModalClasses } from './modal.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PER_GROUP = 5;

const postModalElement = document.querySelector('.big-picture');
const buttonCloseElement = postModalElement.querySelector('#picture-cancel');
const imageElement = postModalElement.querySelector('.big-picture__img img');
const likesCountElement = postModalElement.querySelector('.likes-count');
const descriptionElement = postModalElement.querySelector('.social__caption');

const commentListElement = postModalElement.querySelector('.social__comments');
const commentElement = commentListElement.querySelector('.social__comment');
const commentCountElement = postModalElement.querySelector('.comments-count');
const commentShownCountElement = postModalElement.querySelector('.comments-shown-count');
const buttonLoaderElement = postModalElement.querySelector('.comments-loader');

// Шаблон комментария
const templateCommentElement = commentElement.cloneNode(true);

// Кол-во показанных комментариев
let commentsShownCount = 0;

// Обновить в разметке кол-во показанных комментариев
const renderShownCount = (count) => {
  commentShownCountElement.textContent = count;
};

// Сбросить блок комментариев до изначального состояния
const resetCommentList = () => {
  commentsShownCount = 0;
  buttonLoaderElement.classList.remove('hidden');
};

// Отрисовать комментарии из массива comments,
// начиная с порядкового номера beginIndex и заканчивая endIndex
const renderCommentList = (comments, beginIndex, endIndex) => {
  const currentComments = comments.slice(beginIndex, endIndex);
  const commentListFragment = document.createDocumentFragment();

  currentComments.forEach((comment) => {
    const currentCommentElement = templateCommentElement.cloneNode(true);
    const avatarElement = currentCommentElement.querySelector('.social__picture');
    const textElement = currentCommentElement.querySelector('.social__text');

    avatarElement.src = comment.avatar;
    avatarElement.alt = comment.name;
    textElement.textContent = comment.message;

    commentListFragment.append(currentCommentElement);
  });

  commentListElement.append(commentListFragment);
};

// Загрузить и отрисовать группу новых комментариев
const downloadComments = (comments) => {
  const newCommentsShownCount = commentsShownCount + COMMENTS_PER_GROUP;

  renderCommentList(comments, commentsShownCount, newCommentsShownCount);
  commentsShownCount = (newCommentsShownCount > comments.length) ? comments.length : newCommentsShownCount;
  renderShownCount(commentsShownCount);

  // Если показаны все комментарии, скрыть кнопку загрузки
  if (commentsShownCount >= comments.length) {
    buttonLoaderElement.classList.add('hidden');
  }
};

// Обновить данные в модальном окне
const updatePostData = ({url, description, likes, comments}) => {
  imageElement.src = url;
  descriptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentCountElement.textContent = comments.length;

  // Отрисовать первую группу комментариев
  commentListElement.innerHTML = '';
  downloadComments(comments);
};

// Обработчик события клика по кнопке "загрузить еще".
// Функция записывается в переменную и навешивается обработчик,
// когда модальное окно открывается.
// При закрытии модального окна обработчик удаляется.
let buttonLoaderClickHandler;

// Закрыть модальное окно
const closePostModal = () => {
  toggleModalClasses(postModalElement);
  resetCommentList();
  buttonLoaderElement.removeEventListener('click', buttonLoaderClickHandler);
};

// Закрыть модальное окно по нажатию ESC
const modalEscKeydownHandler = (event) => {
  if (isEscapeKey(event)) {
    closePostModal();
  }
};

// Открыть модальное окно
const openPostModal = (post) => {
  updatePostData(post);
  toggleModalClasses(postModalElement);

  // Обработчик события нажатия Esc
  document.addEventListener(
    'keydown',
    modalEscKeydownHandler,
    { once: true }
  );

  // Обработчик события клика по кнопкп "Загрузить еще"
  buttonLoaderClickHandler = () => downloadComments(post.comments);
  buttonLoaderElement.addEventListener('click', buttonLoaderClickHandler);
};

// Обработчик события клика по крестику "закрыть"
buttonCloseElement.addEventListener('click', () => {
  closePostModal();

  document.removeEventListener('keydown', modalEscKeydownHandler);
});

export { openPostModal };
