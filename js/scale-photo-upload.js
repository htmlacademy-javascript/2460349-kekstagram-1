const STEP = 25;
const MAX_VALUE = 100;
const MIN_VALUE = 25;
const DEFAULT_SCALE = 100;

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleSelect = document.querySelector('.scale__control--value');
const uploadImage = document.querySelector('.img-upload__preview img');

const setScale = (value) => {
  scaleSelect.value = `${value}%`;
  uploadImage.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleSelect.value, 10);

  if (currentValue > MIN_VALUE) {
    setScale(currentValue - STEP);
  }
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleSelect.value, 10);

  if (currentValue < MAX_VALUE) {
    setScale(currentValue + STEP);
  }
};

const resetScaleDefault = () => {
  scaleSelect.value = `${DEFAULT_SCALE}%`;
  uploadImage.style.transform = 'scale(1)';
};

const settingScale = () => {
  resetScaleDefault();
  scaleSmallerButton.addEventListener('click', onSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onBiggerButtonClick);
};

export { resetScaleDefault, settingScale };
