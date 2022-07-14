import { toggleModalClasses } from './modal.js';
import { isEscapeKey } from './util.js';

const COMMENTS_PER_GROUP = 5;
const HIDDEN_CLASS = 'hidden';

const state = {
  shownCommentsCount: 0,
  post: {
    id: -1,
    url: null,
    description: null,
    likes: -1,
    comments: [
      {
        id: -1,
        avatar: null,
        message: null,
        name: null,
      },
    ],
  },
};

const modalElement = document.querySelector('.big-picture');
const buttonCloseElement = modalElement.querySelector('#picture-cancel');
const imageElement = modalElement.querySelector('.big-picture__img img');
const likesCountElement = modalElement.querySelector('.likes-count');
const descriptionElement = modalElement.querySelector('.social__caption');

const commentListElement = modalElement.querySelector('.social__comments');
const templateCommentElement = commentListElement.querySelector('.social__comment').cloneNode(true);
const commentsCountElement = modalElement.querySelector('.comments-count');
const shownCommentsCountElement = modalElement.querySelector('.comments-shown-count');
const buttonLoaderElement = modalElement.querySelector('.comments-loader');

const renderShownCommentsCount = (count) => {
  shownCommentsCountElement.textContent = count;
};

const resetCommentList = () => {
  state.shownCommentsCount = 0;
  buttonLoaderElement.classList.remove(HIDDEN_CLASS);
};

const renderCommentList = (comments, beginIndex, endIndex) => {
  const currentComments = comments.slice(beginIndex, endIndex);
  const commentListFragment = document.createDocumentFragment();

  currentComments.forEach((comment) => {
    const commentElement = templateCommentElement.cloneNode(true);
    const avatarElement = commentElement.querySelector('.social__picture');
    const textElement = commentElement.querySelector('.social__text');

    avatarElement.src = comment.avatar;
    avatarElement.alt = comment.name;
    textElement.textContent = comment.message;

    commentListFragment.append(commentElement);
  });

  commentListElement.append(commentListFragment);
};

const downloadComments = (comments) => {
  const newShownCommentsCount = state.shownCommentsCount + COMMENTS_PER_GROUP;
  const areAllCommentsShown = (newShownCommentsCount >= comments.length);

  renderCommentList(comments, state.shownCommentsCount, newShownCommentsCount);
  state.shownCommentsCount = (areAllCommentsShown) ? comments.length : newShownCommentsCount;
  renderShownCommentsCount(state.shownCommentsCount);

  if (areAllCommentsShown) {
    buttonLoaderElement.classList.add(HIDDEN_CLASS);
  }
};

const updatePostData = ({url, description, likes, comments}) => {
  imageElement.src = url;
  descriptionElement.textContent = description;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;

  commentListElement.innerHTML = '';
  downloadComments(comments);
};

const closePostModal = () => {
  toggleModalClasses(modalElement);
  resetCommentList();
  document.removeEventListener('keydown', onModalEscKeydown);
};

// В данном случае используется декларативное объявление функции,
// чтобы благодаря всплытию этот обработчик можно было удалить
// выше по коду в closePostModal()
function onModalEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closePostModal();
  }
}

const openPostModal = (post) => {
  state.post = post;

  updatePostData(state.post);
  toggleModalClasses(modalElement);

  document.addEventListener('keydown', onModalEscKeydown);
};

const onButtonLoaderClick = (evt) => {
  evt.preventDefault();

  downloadComments(state.post.comments);
};

const onButtonCloseClick = (evt) => {
  evt.preventDefault();

  closePostModal();
};

buttonLoaderElement.addEventListener('click', onButtonLoaderClick);

buttonCloseElement.addEventListener('click', onButtonCloseClick);

export { openPostModal };
