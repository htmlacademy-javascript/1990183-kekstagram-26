import { HIDDEN_CLASS, toggleModalClasses } from './modal.js';
import { isEscapeKey } from './util.js';

const postModalElement = document.querySelector('.big-picture');
const buttonCloseElement = postModalElement.querySelector('#picture-cancel');
const imageElement = postModalElement.querySelector('.big-picture__img img');
const likesCountElement = postModalElement.querySelector('.likes-count');
const descriptionElement = postModalElement.querySelector('.social__caption');

const commentListElement = postModalElement.querySelector('.social__comments');
const commentElement = commentListElement.querySelector('.social__comment');
const commentCountBlockElement = postModalElement.querySelector('.social__comment-count');
const commentCountElement = postModalElement.querySelector('.comments-count');
const commentLoaderElement = postModalElement.querySelector('.comments-loader');

// Временное скрытие элементов
commentCountBlockElement.classList.toggle(HIDDEN_CLASS);
commentLoaderElement.classList.toggle(HIDDEN_CLASS);

// Отрисовать список комментариев
const renderCommentList = (comments) => {
  const commentListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const currentCommentElement = commentElement.cloneNode(true);
    const avatarElement = currentCommentElement.querySelector('.social__picture');
    const textElement = currentCommentElement.querySelector('.social__text');

    avatarElement.src = comment.avatar;
    avatarElement.alt = comment.name;
    textElement.textContent = comment.message;

    commentListFragment.append(currentCommentElement);
  });

  commentListElement.innerHTML = '';
  commentListElement.append(commentListFragment);
};

// Обновить данные в модальном окне
const updatePostData = (post) => {
  imageElement.src = post.url;
  descriptionElement.textContent = post.description;
  likesCountElement.textContent = post.likes;
  commentCountElement.textContent = post.comments.length;

  renderCommentList(post.comments);
};

// Закрыть модальное окно
const closePostModal = () => {
  toggleModalClasses(postModalElement);
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

  document.addEventListener(
    'keydown',
    modalEscKeydownHandler,
    { once: true }
  );
};

// Обработчик события клика по кнопке "закрыть"
buttonCloseElement.addEventListener('click', () => {
  closePostModal();

  document.removeEventListener('keydown', modalEscKeydownHandler);
});

export { openPostModal };
