import { createPostList } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openModal } from './modal.js';

// Генерация данных для списка постов
const posts = createPostList();

// Отрисовка всех постов
renderThumbnails(posts);

// Обработчик события клика по миниатюрам постов
document.addEventListener('click', (event) => {
  const postElement = event.target.closest('.picture');

  if (postElement) {
    event.preventDefault();

    const postId = parseInt(postElement.dataset.id, 10);
    const currentPost = posts.find((post) => (post.id === postId));

    openModal(currentPost);
  }
});
