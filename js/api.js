import { showNotice } from './notification.js';

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram/data';
const ERROR_MESSAGE = 'Произошла ошибка, не удалось получить данные с сервера.';

const getData = async () => {
  let response;

  try {
    response = await fetch(SERVER_URL);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    showNotice(ERROR_MESSAGE);
    return [];
  }

  const data = await response.json();

  return data;
};

export { getData };
