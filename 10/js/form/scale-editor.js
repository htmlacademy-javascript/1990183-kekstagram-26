const ScaleSetting = {
  DEFAULT: 100,
  STEP: 25,
  MIN: 25,
  MAX: 100,
};

const state = {
  currentScale: ScaleSetting.DEFAULT,
};

const formElement = document.querySelector('#upload-select-image');
const controlSmallerElement = formElement.querySelector('.scale__control--smaller');
const controlBiggerElement = formElement.querySelector('.scale__control--bigger');
const scaleFieldElement = formElement.querySelector('.scale__control--value');
const imageElement = formElement.querySelector('.img-upload__preview img');

const setScale = (value) => {
  scaleFieldElement.value = `${value}%`;
  imageElement.style.transform = `scale(${value / 100})`;
};

const resetScale = () => {
  setScale(ScaleSetting.DEFAULT);
};

const onControlSmallerClick = () => {
  if (state.currentScale > ScaleSetting.MIN) {
    state.currentScale -= ScaleSetting.STEP;
    setScale(state.currentScale);
  }
};

const onControlBiggerClick = () => {
  if (state.currentScale < ScaleSetting.MAX) {
    state.currentScale += ScaleSetting.STEP;
    setScale(state.currentScale);
  }
};

controlSmallerElement.addEventListener('click', onControlSmallerClick);

controlBiggerElement.addEventListener('click', onControlBiggerClick);

resetScale();

export { resetScale };
