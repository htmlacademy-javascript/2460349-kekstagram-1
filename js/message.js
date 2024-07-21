import { isEscKey } from './utils.js';
import { onDocumentKeydown as onPopupCloseKeydown } from './popup-upload.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


const MessageType = {
  error: errorTemplate,
  success: successTemplate,
};

const onDocumentClick = (evt) => {
  const messagePopup = document.querySelector('.message');
  if (evt.target.tagName === 'BUTTON' || !messagePopup.firstElementChild.isEqualNode(evt.target)) {
    deleteMessage();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt)) {
    deleteMessage();
  }
};

function deleteMessage () {
  const messagePopup = document.querySelector('.message');
  messagePopup.remove();
  document.removeEventListener('click', onDocumentClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.addEventListener('keydown', onPopupCloseKeydown);
}

const createMessage = (value) => {
  const messageElement = MessageType[value].cloneNode(true);
  document.body.appendChild(messageElement);
  messageElement.classList.add('message');
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onPopupCloseKeydown);
};

export { deleteMessage, createMessage };
