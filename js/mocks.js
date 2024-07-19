// import { getRandomInteger, getRandomArrayElement } from './random.js';
// import { createIdGenerator } from './utils.js';


// const PICTURES_COUNT = 25;
// const AVATAR_COUNT = 6;
// const LIKE_MIN_COUNT = 15;
// const LIKE_MAX_COUNT = 200;
// const COMMENT_COUNT = 20;

// const NAMES = [
//   'Даниил',
//   'Игорь',
//   'Антон',
//   'Ирина',
//   'Юлия',
//   'Татьяна',
// ];

// const DESCRIPTIONS = [
//   'Моменты, которые запечатлены навсегда',
//   'Счастье в каждом кадре',
//   'Когда слова не нужны, достаточно фотографии',
//   'История, рассказанная через объектив',
//   'Остановить время в одном кадре',
//   'Фотография — это способ улыбнуться в будущем',
// ];

// const MESSAGES = [
//   'Всё отлично!',
//   'В целом всё неплохо. Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
// ];

// const generateCommentId = createIdGenerator('comment');

// const createComment = () =>
//   Array.from({length: getRandomInteger(1, 2)}, () => getRandomArrayElement(MESSAGES)).join(' ');

// const getUserComment = () => ({
//   id: generateCommentId(),
//   avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
//   message: createComment(),
//   name: getRandomArrayElement(NAMES),
// });

// const getUserComments = () => {
//   const emptyList = new Array(getRandomInteger(0, COMMENT_COUNT)).fill(null);

//   return emptyList.map(() => getUserComment());

// };

// const createPicture = (index) => ({
//   id: index,
//   url: `photos/${index}.jpg`,
//   description: getRandomArrayElement(DESCRIPTIONS),
//   likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
//   comments: getUserComments(),
// });

// const getPictures = () =>
//   Array.from({length: PICTURES_COUNT}, (_, pictureIndex) =>
//     createPicture(pictureIndex + 1)
//   );

// export { getPictures };
