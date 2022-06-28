import { createPostList } from './data.js';
import { renderThumbnails } from './thumbnails.js';

const posts = createPostList();

renderThumbnails(posts);
