const DEFAULT_FILTER = 'none';

// Настройки фильтров
const Filter = {
  CHROME : {
    STEP: 0.1,
    MAX: 1,
    getFilterStyle: (value) => `grayscale(${value})`,
  },
  SEPIA: {
    STEP: 0.1,
    MAX: 1,
    getFilterStyle: (value) => `sepia(${value})`,
  },
  MARVIN: {
    STEP: 1,
    MAX: 100,
    getFilterStyle: (value) => `invert(${value}%)`,
  },
  PHOBOS: {
    STEP: 0.1,
    MAX: 3,
    getFilterStyle: (value) => `blur(${value}px)`,
  },
  HEAT: {
    STEP: 0.1,
    MAX: 3,
    getFilterStyle: (value) => `brightness(${value})`,
  },
  NONE : {
    getFilterStyle: () => 'none',
  },
};

const formElement = document.querySelector('#upload-select-image');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectListElement = formElement.querySelector('.effects__list');
const sliderFieldsetElement = formElement.querySelector('.img-upload__effect-level');
const levelFieldElement = sliderFieldsetElement.querySelector('.effect-level__value');
const sliderElement = sliderFieldsetElement.querySelector('.effect-level__slider');

// Текущее название фильтра,
// по умолчанию выбран "Оригинал"
let currentFilter = DEFAULT_FILTER;

// Конфигурация слайдера
const sliderConfig = {
  start: 100,
  range: {
    'min': 0,
    'max': 100,
  },
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => value,
    from: (value) => parseFloat(value),
  },
};

// Получить указанный параметр фильтра
const getFilterOption = (filterName, optionName) => Filter[filterName.toUpperCase()][optionName];

// Установить новые значения конфигурации слайдера
const setConfigOption = (config, optionName, optionValue) => {
  config[optionName] = optionValue;
  return config;
};

// Возвращает класс-модификатор для фотографии
const getImageMofifierClass = (modifier) => `effects__preview--${modifier}`;

// Установить для фотографии css-класс, соответстующий фильтру
const setImageClass = (photoElement, newModifier, oldModifier) => {
  const newClass = getImageMofifierClass(newModifier);
  const oldClass = getImageMofifierClass(oldModifier);

  photoElement.classList.add(newClass);
  photoElement.classList.remove(oldClass);
};

// Установить "Оригинал"
const resetFilter = () => {
  sliderElement.setAttribute('disabled', true);
  sliderFieldsetElement.classList.add('hidden');
  levelFieldElement.value = '';
  imageElement.style.filter = 'none';
  currentFilter = DEFAULT_FILTER;
};

// Установить фильтр
const setFilter = (filterName) => {
  const max = getFilterOption(filterName, 'MAX');
  const step = getFilterOption(filterName, 'STEP');

  setConfigOption(sliderConfig, 'start', max);
  setConfigOption(sliderConfig, 'range', { 'min': 0, 'max': max });
  setConfigOption(sliderConfig, 'step', step);

  sliderElement.removeAttribute('disabled');
  sliderElement.noUiSlider.updateOptions(sliderConfig);

  sliderFieldsetElement.classList.remove('hidden');
};

// Инициализировать слайдер
noUiSlider.create(sliderElement, sliderConfig);

// Обработчик события update слайдера
sliderElement.noUiSlider.on('update', () => {
  const filterValue = sliderElement.noUiSlider.get();
  const getStyle = getFilterOption(currentFilter, 'getFilterStyle');

  imageElement.style.filter = getStyle(filterValue);
  levelFieldElement.value = filterValue;
});

// Обработчик события change на радио баттоне
effectListElement.addEventListener('change', (event) => {
  const radioElement = event.target.closest('.effects__radio');

  if (radioElement) {
    // Установить для фотографии соответствующий класс фильтра
    // и обновить значение текущего фильтра
    const newFilter = radioElement.value;
    setImageClass(imageElement, newFilter, currentFilter);
    currentFilter = newFilter;

    if (currentFilter === DEFAULT_FILTER) {
      resetFilter();
    } else {
      setFilter(currentFilter);
    }
  }
});

// Обработчик сброса формы
formElement.addEventListener('reset', resetFilter);

// По умолчанию выбран "Оригинал"
resetFilter();
