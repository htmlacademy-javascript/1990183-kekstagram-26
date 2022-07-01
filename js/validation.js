import { isMaxLengthValid } from './util.js';

const HASHTAG_MAX_COUNT = 5;
const COMMENT_MAX_LENGTH = 140;

// Список возможных ошибок валидации
const ErrorMessage = {
  HASHTAG_FORMAT: 'Хэштеги не соответствуют формату',
  HASHTAG_COUNT: `Вы не можете указать больше ${HASHTAG_MAX_COUNT} хэштегов`,
  HASHTAG_DUPLICATION: 'Один и тот же хэш-тег не может быть использован дважды',
  COMMENT_LENGTH: `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`,
};

// Получить массив хэштегов из строки
const getHashtagsFromField = (string) => string.trim().split(' ');

const hashtagRegExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
// Проверяет, является ли один хэштег валидным
const isValidHashtag = (value) => hashtagRegExp.test(value);

// Проверяет, являются ли все хэштеги в строке валидными
const isValidHashtags = (value) => {
  const hashtags = getHashtagsFromField(value);

  return hashtags.every((hashtag) => isValidHashtag(hashtag));
};

// Проверяет, является ли количество хэштегов валидным
const isValidHashtagsCount = (value) => {
  const hashtags = getHashtagsFromField(value);

  return (hashtags.length <= HASHTAG_MAX_COUNT);
};

// Проверяет, дублируются ли хэштеги
const isHashtagsUnique = (value) => {
  const hashtags = getHashtagsFromField(value);
  const lowercaseHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  const set = new Set(lowercaseHashtags);

  return (set.size === lowercaseHashtags.length);
};

// Провалидировать форму
const validate = (form) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'has-danger',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'form-text-error' ,
  }, false);
  const hashtagsFieldElement = form.querySelector('[name="hashtags"]');
  const commentFieldElement = form.querySelector('[name="description"]');

  pristine.addValidator(
    hashtagsFieldElement,
    (value) => isValidHashtags(value),
    ErrorMessage.HASHTAG_FORMAT
  );

  pristine.addValidator(
    hashtagsFieldElement,
    (value) => isValidHashtagsCount(value),
    ErrorMessage.HASHTAG_COUNT
  );

  pristine.addValidator(
    hashtagsFieldElement,
    (value) => isHashtagsUnique(value),
    ErrorMessage.HASHTAG_DUPLICATION
  );

  pristine.addValidator(
    commentFieldElement,
    (value) => isMaxLengthValid(value, COMMENT_MAX_LENGTH),
    ErrorMessage.COMMENT_LENGTH
  );

  // Обработчик события отправки формы
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      form.submit();
    }
  });

  // Обработчик события сброса формы
  form.addEventListener('reset', () => {
    pristine.reset();
  });
};

export { validate };
