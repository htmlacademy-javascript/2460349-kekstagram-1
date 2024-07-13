import { isEscKey } from './utils.js';

const pageBody = document.body;
const uploadContainer = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');

const onEscapePress = (evt) => {
  const activeElemet = document.activeElement.className;
  if (isEscKey(evt) && activeElemet !== 'text__hashtags' && activeElemet !== 'text__description') {
    evt.preventDefault();
    closePopup();
  }
};

const resetForm = () => {
  uploadForm.reset();
};

uploadFile.addEventListener('change', onUploadChange);
closeButton.addEventListener('click', onCloseButtonClick);

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closePopup ();
}

function closePopup () {
  uploadContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapePress);
  resetForm();
}

function openPopup () {
  uploadContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onEscapePress);
}

function onUploadChange () {
  openPopup();
}
