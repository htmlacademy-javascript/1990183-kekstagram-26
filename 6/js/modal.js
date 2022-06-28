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

const hiddenClass = 'hidden';
const bodyClass = 'modal-open';

// Добавить/удалить css-классы в разметке для показа/скрытия модального окна
const toggleCssClasses = () => {
  commentCountBlockElement.classList.toggle(hiddenClass);
  commentLoaderElement.classList.toggle(hiddenClass);
  modalElement.classList.toggle(hiddenClass);
  document.body.classList.toggle(bodyClass);
};

// Проверяет открыто модальное окно или нет
const isModalClosed = () => modalElement.classList.contains(hiddenClass);
const isModalOpened = () => !isModalClosed();

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

// Открыть модальное окно
const openModal = (post) => {
  updateModalData(post);
  toggleCssClasses();
};

// Закрыть модальное окно
const closeModal = () => {
  toggleCssClasses();
};

// Обработчик события клика по кнопке "закрыть"
buttonCloseElement.addEventListener('click', () => {
  closeModal();
});

// Закрыть модальное окно по нажатию ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && isModalOpened()) {
    closeModal();
  }
});

export { openModal };
