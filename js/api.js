import { showNotice } from './notification.js';

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const ERROR_MESSAGE = 'Произошла ошибка, не удалось получить данные с сервера.';

// Получить данные с сервера:
// dataSuccessHandler - обработчик успешного ответа от сервера
const getData = (dataSuccessHandler) => {
  fetch(SERVER_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(ERROR_MESSAGE);
    })
    .then((data) => dataSuccessHandler(data))
    .catch(() => showNotice(ERROR_MESSAGE));
};

export { getData };
