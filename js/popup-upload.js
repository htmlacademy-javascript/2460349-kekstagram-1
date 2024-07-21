import { isEscKey } from './utils.js';
import { resetScaleDefault, resizeScale } from './scale-photo-upload.js';
import { resetEffect } from './effects-photo-upload.js';

const pageBody = document.body;
const uploadContainer = document.querySelector('.img-upload__overlay');
const uploadFileInput = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const closeButton = document.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  const activeElementClass = document.activeElement.className;
  if (isEscKey(evt) && activeElementClass !== 'text__hashtags' && activeElementClass !== 'text__description') {
    evt.preventDefault();
    closePopup();
  }
};

const resetForm = () => {
  uploadForm.reset();
  resetScaleDefault();
};

function onCloseButtonClick (evt) {
  evt.preventDefault();
  closePopup ();
}

function closePopup () {
  uploadContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
}

const onUploadChange = () => {
  resetEffect();
  resizeScale();
  uploadContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

uploadFileInput.addEventListener('change', onUploadChange);
closeButton.addEventListener('click', onCloseButtonClick);

export {closePopup, onDocumentKeydown};
