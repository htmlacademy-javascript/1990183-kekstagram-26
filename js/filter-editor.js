const DEFAULT_FILTER = 'none';
const HIDDEN_CLASS = 'hidden';

const FilterOption = {
  CHROME : {
    STEP: 0.1,
    MAX: 1,
    getCssFilterValue: (value) => `grayscale(${value})`,
  },
  SEPIA: {
    STEP: 0.1,
    MAX: 1,
    getCssFilterValue: (value) => `sepia(${value})`,
  },
  MARVIN: {
    STEP: 1,
    MAX: 100,
    getCssFilterValue: (value) => `invert(${value}%)`,
  },
  PHOBOS: {
    STEP: 0.1,
    MAX: 3,
    getCssFilterValue: (value) => `blur(${value}px)`,
  },
  HEAT: {
    STEP: 0.1,
    MAX: 3,
    getCssFilterValue: (value) => `brightness(${value})`,
  },
  NONE : {
    getCssFilterValue: () => 'none',
  },
};

const state = {
  currentFilter: DEFAULT_FILTER,
  sliderConfig: {
    start: 100,
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    connect: 'lower',
    format: {
      to: (value) => value,
      from: (value) => parseFloat(value),
    },
  }
};

const formElement = document.querySelector('#upload-select-image');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectListElement = formElement.querySelector('.effects__list');
const sliderFieldsetElement = formElement.querySelector('.img-upload__effect-level');
const levelFieldElement = sliderFieldsetElement.querySelector('.effect-level__value');
const sliderElement = sliderFieldsetElement.querySelector('.effect-level__slider');

const getFilterMax = (filterName) => {
  const filter = filterName.toUpperCase();
  return FilterOption[filter].MAX;
};

const getFilterStep = (filterName) => {
  const filter = filterName.toUpperCase();
  return FilterOption[filter].STEP;
};

const getFilterStyle = (filterName, value) => {
  const filter = filterName.toUpperCase();
  return FilterOption[filter].getCssFilterValue(value);
};

const setSliderConfigMax = (value) => {
  state.sliderConfig.start = value;
  state.sliderConfig.range.max = value;
};

const setSliderConfigStep = (value) => {
  state.sliderConfig.step = value;
};

const getImageModifierClass = (modifier) => `effects__preview--${modifier}`;

const setImageClass = (newModifier, oldModifier) => {
  const newClass = getImageModifierClass(newModifier);
  const oldClass = getImageModifierClass(oldModifier);

  imageElement.classList.add(newClass);
  imageElement.classList.remove(oldClass);
};

const resetFilter = () => {
  state.currentFilter = DEFAULT_FILTER;
  imageElement.style.filter = getFilterStyle(state.currentFilter);
  levelFieldElement.value = '';
  sliderElement.setAttribute('disabled', true);
  sliderFieldsetElement.classList.add(HIDDEN_CLASS);
};

const setFilter = (filterName) => {
  const max = getFilterMax(filterName);
  const step = getFilterStep(filterName);

  setSliderConfigMax(max);
  setSliderConfigStep(step);

  sliderElement.removeAttribute('disabled');
  sliderElement.noUiSlider.updateOptions(state.sliderConfig);

  sliderFieldsetElement.classList.remove(HIDDEN_CLASS);
};

const onSliderUpdate = () => {
  const filterValue = sliderElement.noUiSlider.get();

  imageElement.style.filter = getFilterStyle(state.currentFilter, filterValue);
  levelFieldElement.value = filterValue;
};

const onEffectListChange = (event) => {
  const radioElement = event.target.closest('.effects__radio');

  if (radioElement) {
    const newFilter = radioElement.value;
    setImageClass(newFilter, state.currentFilter);
    state.currentFilter = newFilter;

    if (state.currentFilter === DEFAULT_FILTER) {
      resetFilter();
    } else {
      setFilter(state.currentFilter);
    }
  }
};

noUiSlider.create(sliderElement, state.sliderConfig);

sliderElement.noUiSlider.on('update', onSliderUpdate);

effectListElement.addEventListener('change', onEffectListChange);

resetFilter();

export { resetFilter };
