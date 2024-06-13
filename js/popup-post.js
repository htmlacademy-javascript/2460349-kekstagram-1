import { pictures } from './data.js';
import { isEscKey } from './utils.js';

const pageBody = document.body;
const picturesContainer = document.querySelector('.pictures');
const fullSizePopupContainer = document.querySelector('.big-picture');
const bigPictureImg = fullSizePopupContainer.querySelector('.big-picture__img').querySelector('img');
const postDescription = fullSizePopupContainer.querySelector('.social__caption');
const likesCount = fullSizePopupContainer.querySelector('.likes-count');

const commentsCount = fullSizePopupContainer.querySelector('.comments-count');

const socialCommentsContainer = fullSizePopupContainer.querySelector('.social__comments');
const postComment = fullSizePopupContainer.querySelector('.social__comment');

const closePopupButton = fullSizePopupContainer.querySelector('#picture-cancel');

const renderComment = function (comment) {
  const userComment = postComment.cloneNode(true);
  userComment.querySelector('.social__picture').src = comment.avatar;
  userComment.querySelector('.social__picture').alt = comment.name;
  userComment.querySelector('.social__text').textContent = comment.message;
  return userComment;
};

const clearComments = () => {
  const currentComments = socialCommentsContainer.querySelectorAll('.social__comment');
  currentComments.forEach((element) => element.remove());
};

const makeComments = function (comments) {
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentFragment.append(renderComment(comment));
  });

  clearComments();
  socialCommentsContainer.append(commentFragment);
};

const escapePressHander = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup () {
  fullSizePopupContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  closePopupButton.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', escapePressHander);
}

const openPopup = () => {
  fullSizePopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  closePopupButton.addEventListener('click', closePopup);
  document.addEventListener('keydown', escapePressHander);

  fullSizePopupContainer.querySelector('.social__comment-count').classList.add('hidden');
  fullSizePopupContainer.querySelector('.comments-loader').classList.add('hidden');
};

const showPhotoPopup = (post) => {
  openPopup();
  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  postDescription.textContent = post.description;
  makeComments(post.comments);
};

const previewClickHandler = (evt) => {
  const linkElements = picturesContainer.querySelectorAll('.picture');
  const imageLink = evt.target.parentElement;
  const imageIndex = Array.from(linkElements).findIndex((el) => el === imageLink);
  const bigPictureData = pictures[imageIndex];

  showPhotoPopup(bigPictureData);
};

picturesContainer.addEventListener('click', previewClickHandler);
