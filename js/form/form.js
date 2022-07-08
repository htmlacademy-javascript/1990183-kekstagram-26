import { isEscapeKey } from '../util.js';
import { toggleModalClasses } from '../modal.js';
import { resetValidator, isFormValid } from './validation.js';
import { resetScale } from './scale-editor.js';
import { resetFilter } from './filter-editor.js';
import { setData } from '../api.js';
import { showSuccessNotice, showErrorNotice } from './notice.js';

const formElement = document.querySelector('#upload-select-image');
const imageElement = formElement.querySelector('.img-upload__preview img');
const uploadFileElement = formElement.querySelector('#upload-file');
const textFieldElements = formElement.querySelectorAll('[name="hashtags"], [name="description"]');
const modalElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = modalElement.querySelector('#upload-cancel');
const submitButtonElement = formElement.querySelector('#upload-submit');

const resetUploadFile = () => {
  uploadFileElement.value = '';
};

const resetTextFields = () => {
  textFieldElements.forEach((field) => {
    field.value = '';
  });
};

const resetForm = () => {
  resetUploadFile();
  resetTextFields();
  resetValidator();
  resetScale();
  resetFilter();
};

const closeUploadModal = () => {
  toggleModalClasses(modalElement);
  resetUploadFile();
  document.removeEventListener('keydown', onModalEscKeydown);
};

// В данном случае используется декларативное объявление функции,
// чтобы благодаря всплытию этот обработчик можно было удалить
// выше по коду в closeUploadModal()
function onModalEscKeydown (event) {
  if (isEscapeKey(event)) {
    closeUploadModal();
    resetForm();
  }
}

const openUploadModal = () => {
  toggleModalClasses(modalElement);
  document.addEventListener('keydown', onModalEscKeydown);
};

const disableSubmit = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
};

const enableSubmit = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

const uploadImageFile = (inputFile) => {
  const file = inputFile.files[0];
  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onload = () => {
    imageElement.src = reader.result;
  };
  reader.onerror = () => {
    throw new Error('Ошибка загрузки файла');
  };

};

const onUploadFileChange = (event) => {
  uploadImageFile(event.target);
  openUploadModal();
};

const onCloseButtonClick = (event) => {
  event.preventDefault();
  closeUploadModal();
  resetForm();
};

const onSuccessResponse = () => {
  closeUploadModal();
  resetForm();
  enableSubmit();
  showSuccessNotice();
};

const onFailResponse = () => {
  closeUploadModal();
  enableSubmit();
  showErrorNotice();
};

const onFormSubmit = (event) => {
  event.preventDefault();

  if (isFormValid()) {
    disableSubmit();
    setData(event.target, onSuccessResponse, onFailResponse);
  }
};

uploadFileElement.addEventListener('change', onUploadFileChange);
closeButtonElement.addEventListener('click', onCloseButtonClick);
formElement.addEventListener('submit', onFormSubmit);

textFieldElements.forEach((field) => {
  field.addEventListener('keydown', (event) => {
    event.stopPropagation();
  });
});
