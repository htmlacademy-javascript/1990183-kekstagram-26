import { getUniqueRandomArrayElements } from './util.js';

const RANDOM_POST_COUNT = 10;
const CONTAINER_INACTIVE_CLASS = 'img-filters--inactive';
const BUTTON_ACTIVE_CLASS = 'img-filters__button--active';

const filterContainerElement = document.querySelector('.img-filters');
const filterFormElement = filterContainerElement.querySelector('.img-filters__form');

const state = {
  activeButton: filterFormElement.querySelector(`.${BUTTON_ACTIVE_CLASS}`),
};

const getDefaultPosts = (posts) => posts;

const getRandomPosts = (posts) => getUniqueRandomArrayElements(
  posts,
  RANDOM_POST_COUNT
);

const getPopularPosts = (posts) => {
  const compareCommentLengths = (a, b) => (b.comments.length - a.comments.length);
  const popularPosts = posts.slice().sort(compareCommentLengths);

  return popularPosts;
};

const buttonToGetPosts = {
  'filter-default': getDefaultPosts,
  'filter-random': getRandomPosts,
  'filter-discussed': getPopularPosts,
};

const setActiveButtonClass = (buttonElement) => {
  state.activeButton.classList.remove(BUTTON_ACTIVE_CLASS);
  buttonElement.classList.add(BUTTON_ACTIVE_CLASS);
  state.activeButton = buttonElement;
};

const initializeFilter = (posts, cb) => {
  const onFormClick = (evt) => {
    const buttonElement = evt.target.closest('.img-filters__button');

    if (buttonElement) {
      evt.preventDefault();

      const isButtonActive = buttonElement.classList.contains(BUTTON_ACTIVE_CLASS);

      if (isButtonActive) {
        return;
      }

      const buttonId = buttonElement.id;
      const getCurrentPosts = buttonToGetPosts[buttonId];
      const currentPosts = getCurrentPosts(posts);

      cb(currentPosts);
      setActiveButtonClass(buttonElement);
    }
  };

  filterContainerElement.classList.remove(CONTAINER_INACTIVE_CLASS);

  filterFormElement.addEventListener('click', onFormClick);
};

export { initializeFilter };
