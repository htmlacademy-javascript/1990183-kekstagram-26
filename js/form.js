import { isEscapeKey } from './util.js';
import { toggleModalClasses } from './modal.js';
import { validate } from './validation.js';
import { createScaleEditor } from './scale-editor.js';
import { createFilterEditor } from './filter-editor.js';

const uploadFileElement = document.querySelector('#upload-file');
const uploadFormElement = document.querySelector('#upload-select-image');
const fieldsElements = uploadFormElement.querySelectorAll('[name="hashtags"], [name="description"]');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const buttonCloseElement = uploadModalElement.querySelector('#upload-cancel');

// Закрыть модальное окно с формой
const closeUploadModal = () => {
  toggleModalClasses(uploadModalElement);
  uploadFormElement.reset();
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

// Валидация формы
validate(uploadFormElement);

// Изменение масштаба загружаемого изображения
createScaleEditor(uploadFormElement);

// Наложение фильтра на загружаемое изображение
createFilterEditor(uploadFormElement);
