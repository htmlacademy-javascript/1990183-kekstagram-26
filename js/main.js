import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { openPostModal } from './post-view.js';
import './form/form.js';

const initializePosts = async () => {
  const picturesContainerElement = document.querySelector('.pictures');
  const posts = await getData();

  const onPicturesContainerClick = (event) => {
    const postElement = event.target.closest('.picture');

    if (postElement) {
      event.preventDefault();

      const postId = parseInt(postElement.dataset.id, 10);
      const currentPost = posts.find((post) => (post.id === postId));

      openPostModal(currentPost);
    }
  };

  renderThumbnails(posts);

  picturesContainerElement.addEventListener('click', onPicturesContainerClick);
};

initializePosts();
