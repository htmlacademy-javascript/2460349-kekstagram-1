import { photosArray } from './main.js';
import { isEscKey } from './utils.js';

const pageBody = document.body;
const picturesContainer = document.querySelector('.pictures');
const fullSizePopupContainer = document.querySelector('.big-picture');
const bigPictureImg = fullSizePopupContainer.querySelector('.big-picture__img').querySelector('img');
const postDescription = fullSizePopupContainer.querySelector('.social__caption');
const likesCount = fullSizePopupContainer.querySelector('.likes-count');
const currentCommentsCount = fullSizePopupContainer.querySelector('.social__comment-count');
const amountCommentsCount = fullSizePopupContainer.querySelector('.comments-count');
const socialCommentsContainer = fullSizePopupContainer.querySelector('.social__comments');
const postComment = fullSizePopupContainer.querySelector('.social__comment');
const closePopupButton = fullSizePopupContainer.querySelector('#picture-cancel');
const loadMoreButton = fullSizePopupContainer.querySelector('.social__comments-loader');

const COMMENT_LIMIT = 5;
let displayedCommentsCount;

const getComments = () => Array.from(socialCommentsContainer.children);

const renderComment = function (comment) {
  const userComment = postComment.cloneNode(true);
  userComment.querySelector('.social__picture').src = comment.avatar;
  userComment.querySelector('.social__picture').alt = comment.name;
  userComment.querySelector('.social__text').textContent = comment.message;
  return userComment;
};

const clearComments = () => getComments().forEach((element) => element.remove());

const showCommentsLoader = () => {
  loadMoreButton.classList.remove('hidden');
};

const hideCommentsLoader = () => {
  loadMoreButton.classList.add('hidden');
};

const makeComments = function (comments) {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentFragment.append(renderComment(comment));
  });

  const commentsCount = commentFragment.children.length;

  clearComments();
  socialCommentsContainer.append(commentFragment);

  displayedCommentsCount = Math.min(COMMENT_LIMIT, commentsCount);

  const commentsList = getComments();

  commentsList.slice(COMMENT_LIMIT, socialCommentsContainer.children.length).forEach((el) => el.classList.add('hidden'));
  if (commentsCount <= COMMENT_LIMIT) {
    hideCommentsLoader();
    currentCommentsCount.innerHTML = `${commentsCount} из <span class="comments-count">${commentsCount}</span> комментариев`;
  } else {
    showCommentsLoader ();
    currentCommentsCount.innerHTML = `${COMMENT_LIMIT} из <span class="comments-count">${commentsCount}</span> комментариев`;
  }
};

const loadMoreComments = () => {
  const comments = getComments();
  const updatedCommentsCount = Math.min(displayedCommentsCount + COMMENT_LIMIT, comments.length);
  comments.slice(displayedCommentsCount, updatedCommentsCount).forEach((el) => el.classList.remove('hidden'));
  if (comments.length === updatedCommentsCount) {
    hideCommentsLoader();
  }
  currentCommentsCount.innerHTML = currentCommentsCount.innerHTML.replace(displayedCommentsCount, updatedCommentsCount);

  displayedCommentsCount = updatedCommentsCount;
};

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    onClosePopupButtonClick();
  }
};

function onClosePopupButtonClick () {
  fullSizePopupContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  closePopupButton.removeEventListener('click', onClosePopupButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPopup = () => {
  fullSizePopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  closePopupButton.addEventListener('click', onClosePopupButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  loadMoreButton.addEventListener('click', loadMoreComments);

};

const showPhotoPopup = (post) => {
  openPopup();
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  amountCommentsCount.textContent = post.comments.length;
  postDescription.textContent = post.description;
  makeComments(post.comments);
};

const onPicturesContainerClick = (evt) => {
  if (!evt.target.classList.contains('picture__img')) {
    return;
  }

  const linkElements = picturesContainer.querySelectorAll('.picture');
  const imageLink = evt.target.parentElement;
  const imageIndex = Array.from(linkElements).findIndex((el) => el === imageLink);
  const bigPictureData = photosArray[imageIndex];
  showPhotoPopup(bigPictureData);
};

picturesContainer.addEventListener('click', onPicturesContainerClick);


