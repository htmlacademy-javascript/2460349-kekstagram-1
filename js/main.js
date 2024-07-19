import './popup-post.js';
import './popup-upload.js';
import './effects-photo-upload.js';
import { getData } from './api.js';
import {makePictures} from './previews.js';
import { showAlert } from './utils.js';
import {closePopup} from './popup-upload.js';
import {setUserFormSubmit} from './validator.js';

const photosArr = [];

getData()
  .then((photos) => {
    const objArr = Array.from(photos);
    objArr.forEach((element) => {
      photosArr.push(element);
    });
    makePictures(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closePopup);

export { photosArr };
