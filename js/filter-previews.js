import { makePictures } from './previews.js';
import { debounce, shuffle } from './utils.js';

const RANDOM_NUMBER_PICTURES = 10;

const filtersContainer = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

const comparePictures = (picA, picB) => {
  const rankA = picA.comments.length;
  const rankB = picB.comments.length;
  return rankB - rankA;
};

const createDefaultFilter = (pictures) => pictures.slice();

const createRandomFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return shuffle(picturesArray).slice(0, RANDOM_NUMBER_PICTURES);
};

const createDiscussedFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return picturesArray.sort(comparePictures);
};

const removeActiveClass = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

const clearPicturesContainer = () => {
  const picturesOnPage = document.querySelectorAll('.picture');
  picturesOnPage.forEach((picture) => {
    picture.remove();
  });
};

const renderPicturesFilter = (pictures) => {
  clearPicturesContainer();
  makePictures(pictures);
};

const showFilteredPictures = (pictures) => {
  filtersContainer.classList.remove('img-filters--inactive');
  filtersContainer.addEventListener('click', debounce((evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }
    removeActiveClass();
    if (evt.target === defaultButton) {
      defaultButton.classList.add('img-filters__button--active');
      renderPicturesFilter(createDefaultFilter(pictures));
    }
    if (evt.target === randomButton) {
      randomButton.classList.add('img-filters__button--active');
      renderPicturesFilter(createRandomFilter(pictures));
    }
    if (evt.target === discussedButton) {
      discussedButton.classList.add('img-filters__button--active');
      renderPicturesFilter(createDiscussedFilter(pictures));
    }
  }));
};

export { showFilteredPictures };

