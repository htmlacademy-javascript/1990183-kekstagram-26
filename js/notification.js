const templateNotice = document.querySelector('#notice').content.querySelector('.notice');
const noticeElement = templateNotice.cloneNode(true);
const textElement = noticeElement.querySelector('.notice__text');
const buttonCloseElement = noticeElement.querySelector('.notice__close');

// Показать уведомление
const showNotice = (text) => {
  textElement.textContent = text;
  document.body.append(noticeElement);
};

// Обработчик события клика по крестику
buttonCloseElement.addEventListener('click', () => {
  textElement.textContent = '';
  noticeElement.remove();
});

export { showNotice };
