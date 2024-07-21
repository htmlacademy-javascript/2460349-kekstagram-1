import './popup-post.js';
import './upload-photo.js';
import './effects-photo-upload.js';
import { getData } from './api.js';
import { makePictures } from './previews.js';
import { showAlert } from './utils.js';
import { closePopup } from './popup-upload.js';
import { setUserFormSubmit } from './validator.js';
import { showFilteredPictures } from './filter-previews.js';

const pictures = [];

getData()
  .then((photos) => {
    const objArr = Array.from(photos);
    objArr.forEach((element) => {
      pictures.push(element);
    });
    makePictures(photos);
    showFilteredPictures(photos);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closePopup);

export { pictures };
