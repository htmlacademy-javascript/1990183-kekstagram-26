import { isEscapeKey } from './util.js';
import { toggleModalClasses } from './modal.js';
import { resetValidator } from './validation.js';
import { resetScale } from './scale-editor.js';
import './filter-editor.js';

const uploadFileElement = document.querySelector('#upload-file');
const uploadFormElement = document.querySelector('#upload-select-image');
const fieldsElements = uploadFormElement.querySelectorAll('[name="hashtags"], [name="description"]');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const buttonCloseElement = uploadModalElement.querySelector('#upload-cancel');

// Сбросить все поля формы
const resetForm = () => {
  uploadFormElement.reset();
  resetValidator();
  resetScale();
};

// Закрыть модальное окно с формой
const closeUploadModal = () => {
  toggleModalClasses(uploadModalElement);
  resetForm();
};

// Закрыть модальное окно по нажатию ESC
const modalEscKeydownHandler = (event) => {
  if (isEscapeKey(event)) {
    closeUploadModal();
  }
};

// Открыть модальное окно с формой
const openUploadModal = () => {
  toggleModalClasses(uploadModalElement);

  document.addEventListener(
    'keydown',
    modalEscKeydownHandler,
    { once: true }
  );
};

// Обработчик события загрузки фото
uploadFileElement.addEventListener('change', () => {
  openUploadModal();
});

// Обработчик события клика по крестику (кнопка закрыть)
buttonCloseElement.addEventListener('click', () => {
  closeUploadModal();

  document.removeEventListener('keydown', modalEscKeydownHandler);
});

// Запретить закрытие модального окна при нажатии Esc,
// если одно из полей ввода находится в фокусе
fieldsElements.forEach((field) => {
  field.addEventListener('keydown', (event) => {
    event.stopPropagation();
  });
});
