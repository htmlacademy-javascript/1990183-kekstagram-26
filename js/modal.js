const HIDDEN_CLASS = 'hidden';
const BODY_CLASS = 'modal-open';

const modalElement = document.querySelector('.big-picture');
const buttonCloseElement = modalElement.querySelector('#picture-cancel');
const imageElement = modalElement.querySelector('.big-picture__img img');
const likesCountElement = modalElement.querySelector('.likes-count');
const descriptionElement = modalElement.querySelector('.social__caption');

const commentListElement = modalElement.querySelector('.social__comments');
const commentElement = commentListElement.querySelector('.social__comment');
const commentCountBlockElement = modalElement.querySelector('.social__comment-count');
const commentCountElement = modalElement.querySelector('.comments-count');
const commentLoaderElement = modalElement.querySelector('.comments-loader');

// Добавить/удалить css-классы в разметке для показа/скрытия модального окна
const toggleCssClasses = () => {
  commentCountBlockElement.classList.toggle(HIDDEN_CLASS);
  commentLoaderElement.classList.toggle(HIDDEN_CLASS);
  modalElement.classList.toggle(HIDDEN_CLASS);
  document.body.classList.toggle(BODY_CLASS);
};

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
const updateModalData = (post) => {
  imageElement.src = post.url;
  descriptionElement.textContent = post.description;
  likesCountElement.textContent = post.likes;
  commentCountElement.textContent = post.comments.length;

  renderCommentList(post.comments);
};

// Закрыть модальное окно
const closeModal = () => {
  toggleCssClasses();
};

// Закрыть модальное окно по нажатию ESC
const closeModalByEscHandler = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

// Открыть модальное окно
const openModal = (post) => {
  updateModalData(post);
  toggleCssClasses();

  document.addEventListener(
    'keydown',
    closeModalByEscHandler,
    { once: true }
  );
};

// Обработчик события клика по кнопке "закрыть"
buttonCloseElement.addEventListener('click', () => {
  closeModal();

  document.removeEventListener('keydown', closeModalByEscHandler);
});

export { openModal };
