import { isMaxLengthValid } from './util.js';

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

const ErrorMessage = {
  HASHTAG_FORMAT: 'Хэштеги не соответствуют формату',
  HASHTAG_COUNT: `Вы не можете указать больше ${HASHTAG_MAX_COUNT} хэштегов`,
  HASHTAG_DUPLICATION: 'Один и тот же хэш-тег не может быть использован дважды',
  COMMENT_LENGTH: `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`,
};

const formElement = document.querySelector('#upload-select-image');
const hashtagsFieldElement = formElement.querySelector('[name="hashtags"]');
const commentFieldElement = formElement.querySelector('[name="description"]');

const getHashtagsFromField = (string) => {
  string = string.trim();

  if (string.length === 0) {
    return [];
  }

  return string.split(' ');
};

const hashtagRegExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const isHashtagValid = (value) => hashtagRegExp.test(value);

const areHashtagsValid = (value) => {
  const hashtags = getHashtagsFromField(value);

  return hashtags.every((hashtag) => isHashtagValid(hashtag));
};

const isHashtagsCountValid = (value) => {
  const hashtags = getHashtagsFromField(value);

  return (hashtags.length <= HASHTAG_MAX_COUNT);
};

const areHashtagsUnique = (value) => {
  const hashtags = getHashtagsFromField(value);
  const lowercaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const set = new Set(lowercaseHashtags);

  return (set.size === lowercaseHashtags.length);
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form-text-error' ,
}, false);

const resetValidator = () => {
  pristine.reset();
};

pristine.addValidator(
  hashtagsFieldElement,
  areHashtagsValid,
  ErrorMessage.HASHTAG_FORMAT
);

pristine.addValidator(
  hashtagsFieldElement,
  isHashtagsCountValid,
  ErrorMessage.HASHTAG_COUNT
);

pristine.addValidator(
  hashtagsFieldElement,
  areHashtagsUnique,
  ErrorMessage.HASHTAG_DUPLICATION
);

pristine.addValidator(
  commentFieldElement,
  (value) => isMaxLengthValid(value, COMMENT_MAX_LENGTH),
  ErrorMessage.COMMENT_LENGTH
);

const onFormSubmit = (event) => {
  event.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    formElement.submit();
  }
};

formElement.addEventListener('submit', onFormSubmit);

export { resetValidator };
