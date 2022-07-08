import { isEscapeKey } from './util.js';
import { toggleModalClasses } from './modal.js';
import { resetValidator } from './validation.js';
import { resetScale } from './scale-editor.js';
import { resetFilter } from './filter-editor.js';

const formElement = document.querySelector('#upload-select-image');
const imageElement = formElement.querySelector('.img-upload__preview img');
const uploadFileElement = formElement.querySelector('#upload-file');
const fieldsElements = formElement.querySelectorAll('[name="hashtags"], [name="description"]');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const buttonCloseElement = uploadModalElement.querySelector('#upload-cancel');

const resetFields = () => {
  uploadFileElement.value = '';
  fieldsElements.forEach((field) => {
    field.value = '';
  });
};

const resetForm = () => {
  resetFields();
  resetValidator();
  resetScale();
  resetFilter();
};

const closeUploadModal = () => {
  toggleModalClasses(uploadModalElement);
  resetForm();
};

const onModalEscKeydown = (event) => {
  if (isEscapeKey(event)) {
    closeUploadModal();
  }
};

const openUploadModal = () => {
  toggleModalClasses(uploadModalElement);

  document.addEventListener(
    'keydown',
    onModalEscKeydown,
    { once: true }
  );
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

const onButtonCloseClick = () => {
  closeUploadModal();

  document.removeEventListener('keydown', onModalEscKeydown);
};

uploadFileElement.addEventListener('change', onUploadFileChange);

buttonCloseElement.addEventListener('click', onButtonCloseClick);

fieldsElements.forEach((field) => {
  field.addEventListener('keydown', (event) => {
    event.stopPropagation();
  });
});
