
const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture = function ({url, description, likes, comments}) {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;

  return picture;
};

const makePictures = function (photos) {
  const fragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    fragment.append(renderPicture(photo));
  });

  pictures.append(fragment);
};

export{makePictures};
