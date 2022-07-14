const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsContainerElement = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const removeThumbnails = () => {
  const thumbnails = thumbnailsContainerElement.querySelectorAll('.picture');

  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

const renderThumbnails = (posts) => {
  removeThumbnails();

  posts.forEach((post) => {
    const thumbnailElement = thumbnailTemplateElement.cloneNode(true);
    const imageElement = thumbnailElement.querySelector('.picture__img');
    const likesElement = thumbnailElement.querySelector('.picture__likes');
    const commentsElement = thumbnailElement.querySelector('.picture__comments');

    thumbnailElement.dataset.id = post.id;
    imageElement.src = post.url;
    imageElement.alt = post.description;
    likesElement.textContent = post.likes;
    commentsElement.textContent = post.comments.length;

    fragment.append(thumbnailElement);
  });

  thumbnailsContainerElement.append(fragment);
};

export {renderThumbnails};
