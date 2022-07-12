import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { openPostModal } from './post-view.js';
import './form/form.js';

const initializePosts = async () => {
  const picturesContainerElement = document.querySelector('.pictures');
  const posts = await getData();

  if (posts.length < 1) {
    return;
  }

  const onPicturesContainerClick = (evt) => {
    const postElement = evt.target.closest('.picture');

    if (postElement) {
      evt.preventDefault();

      const postId = parseInt(postElement.dataset.id, 10);
      const currentPost = posts.find((post) => (post.id === postId));

      openPostModal(currentPost);
    }
  };

  renderThumbnails(posts);

  picturesContainerElement.addEventListener('click', onPicturesContainerClick);
};

initializePosts();
