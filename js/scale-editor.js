const STEP = 25;
const DEFAULT_SCALE = 50;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

// Установить значение масштаба
const setScale = (fieldElement, imageElement, value) => {
  fieldElement.value = value;
  imageElement.style.transform = `scale(${value / 100})`;
};

const createScaleEditor = (form) => {
  const controlSmallerElement = form.querySelector('.scale__control--smaller');
  const controlBiggerElement = form.querySelector('.scale__control--bigger');
  const scaleFieldElement = form.querySelector('.scale__control--value');
  const imageElement = form.querySelector('.img-upload__preview img');

  // Установить масштаб по умолчанию
  setScale(scaleFieldElement, imageElement, DEFAULT_SCALE);

  // Текущее значение масштаба
  let currentScale = Number(scaleFieldElement.value);

  // Обработчик события клика по кнопке уменьшения масштаба
  controlSmallerElement.addEventListener('click', () => {
    if (currentScale > MIN_SCALE) {
      currentScale -= STEP;
      setScale(scaleFieldElement, imageElement, currentScale);
    }
  });

  // Обработчик события клика по кнопке увеличения масштаба
  controlBiggerElement.addEventListener('click', () => {
    if (currentScale < MAX_SCALE) {
      currentScale += STEP;
      setScale(scaleFieldElement, imageElement, currentScale);
    }
  });
};

export { createScaleEditor };
