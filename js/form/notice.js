import { isEscapeKey } from '../util.js';

const SuccessModal = {
  TEMPLATE: '#success',
  ELEMENT: '.success',
  BUTTON: '.success__button',
  CONTAINER: '.success__inner',
};

const ErrorModal = {
  TEMPLATE: '#error',
  ELEMENT: '.error',
  BUTTON: '.error__button',
  CONTAINER: '.error__inner',
};

const createNotice = (config) => {
  const templateNotice = document.querySelector(config.TEMPLATE).content.querySelector(config.ELEMENT);
  const noticeElement = templateNotice.cloneNode(true);
  const closeButtonElement = noticeElement.querySelector(config.BUTTON);

  const showNotice = () => {
    document.body.append(noticeElement);
    document.addEventListener('keydown', onNoticeEscKeydown);
  };

  const closeNotice = () => {
    noticeElement.remove();
    document.removeEventListener('keydown', onNoticeEscKeydown);
  };

  const onNoticeClick = (evt) => {
    const noticeContainerElement = evt.target.closest(config.CONTAINER);

    if (!noticeContainerElement) {
      closeNotice();
    }
  };

  // В данном случае используется декларативное объявление функции,
  // чтобы благодаря всплытию этот обработчик можно было удалить
  // выше по коду в closeNotice()
  function onNoticeEscKeydown (evt) {
    if (isEscapeKey(evt)) {
      closeNotice();
    }
  }

  const onCloseButtonClick = () => closeNotice();

  closeButtonElement.addEventListener('click', onCloseButtonClick);
  noticeElement.addEventListener('click', onNoticeClick);

  return showNotice;
};

const showSuccessNotice = createNotice(SuccessModal);
const showErrorNotice = createNotice(ErrorModal);

export { showSuccessNotice, showErrorNotice };
