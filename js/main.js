import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { openPostModal } from './post-view.js';
import './form.js';

// Отрисовать посты и инициализировать модальные окна
const initializePosts = (posts) => {
  // Отрисовка всех постов
  renderThumbnails(posts);

  // Обработчик события клика по миниатюрам постов
  document.addEventListener('click', (event) => {
    const postElement = event.target.closest('.picture');

    if (postElement) {
      event.preventDefault();

      const postId = parseInt(postElement.dataset.id, 10);
      const currentPost = posts.find((post) => (post.id === postId));

      openPostModal(currentPost);
    }
  });
};

getData(initializePosts);
