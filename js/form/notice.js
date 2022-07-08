import { isEscapeKey } from '../util.js';

const SuccessSelector = {
  TEMPLATE: '#success',
  ELEMENT: '.success',
  BUTTON: '.success__button',
  CONTAINER: '.success__inner',
};

const ErrorSelector = {
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

  const onCloseButtonClick = () => {
    noticeElement.remove();
    document.removeEventListener('keydown', onNoticeEscKeydown);
  };

  const onNoticeClick = (event) => {
    const noticeContainer = event.target.closest(config.CONTAINER);

    if (!noticeContainer) {
      onCloseButtonClick();
    }
  };

  // В данном случае используется декларативное объявление функции,
  // чтобы благодаря всплытию этот обработчик можно было удалить
  // выше по коду в onCloseButtonClick()
  function onNoticeEscKeydown (event) {
    if (isEscapeKey(event)) {
      onCloseButtonClick();
    }
  }

  closeButtonElement.addEventListener('click', onCloseButtonClick);
  noticeElement.addEventListener('click', onNoticeClick);

  return showNotice;
};

const showSuccessNotice = createNotice(SuccessSelector);
const showErrorNotice = createNotice(ErrorSelector);

export { showSuccessNotice, showErrorNotice };
