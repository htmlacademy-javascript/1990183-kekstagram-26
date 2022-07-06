const STEP = 25;
const DEFAULT_SCALE = 100;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const formElement = document.querySelector('#upload-select-image');
const controlSmallerElement = formElement.querySelector('.scale__control--smaller');
const controlBiggerElement = formElement.querySelector('.scale__control--bigger');
const scaleFieldElement = formElement.querySelector('.scale__control--value');
const imageElement = formElement.querySelector('.img-upload__preview img');

// Установить значение масштаба
const setScale = (value) => {
  scaleFieldElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / 100})`;
};

// Установить масштаб по умолчанию
const resetScale = () => {
  setScale(DEFAULT_SCALE);
};

resetScale();

// Текущее значение масштаба
let currentScale = parseInt(scaleFieldElement.value, 10);

// Обработчик события клика по кнопке уменьшения масштаба
controlSmallerElement.addEventListener('click', () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= STEP;
    setScale(currentScale);
  }
});

// Обработчик события клика по кнопке увеличения масштаба
controlBiggerElement.addEventListener('click', () => {
  if (currentScale < MAX_SCALE) {
    currentScale += STEP;
    setScale(currentScale);
  }
});

export { resetScale };
