import { showNotice } from './notice.js';

const SERVER_URL = 'https://26.javascript.pages.academy/kekstagram';
const SERVER_URL_DATA = `${SERVER_URL}/data`;
const ERROR_MESSAGE = 'Произошла ошибка, не удалось получить данные с сервера.';

const getData = async () => {
  let response;

  try {
    response = await fetch(SERVER_URL_DATA);

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

const setData = async (form, onSuccess, onFail) => {
  let response;

  try {
    response = await fetch(
      SERVER_URL,
      {
        method: 'POST',
        body: new FormData(form),
      }
    );

    if (response.ok) {
      onSuccess();
    } else {
      throw new Error(`${response.status} = ${response.statusText}`);
    }
  } catch (error) {
    onFail();
  }
};

export { getData, setData };
