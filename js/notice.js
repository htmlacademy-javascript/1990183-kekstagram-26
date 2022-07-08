const templateNotice = document.querySelector('#notice').content.querySelector('.notice');
const noticeElement = templateNotice.cloneNode(true);
const textElement = noticeElement.querySelector('.notice__text');
const closeButtonElement = noticeElement.querySelector('.notice__close');

const showNotice = (text) => {
  textElement.textContent = text;
  document.body.append(noticeElement);
};

const onCloseButtonClick = () => {
  noticeElement.remove();
};

closeButtonElement.addEventListener('click', onCloseButtonClick);

export { showNotice };
