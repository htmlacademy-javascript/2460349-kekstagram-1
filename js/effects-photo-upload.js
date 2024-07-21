const uploadImage = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectsContainer = document.querySelector('.effects__list');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const sliderValue = sliderContainer.querySelector('.effect-level__value');

const Effects = {
  NONE: 'none',
  SEPIA: 'sepia',
  CHROM: 'chrome',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

const EffectsToFilterName = {
  [Effects.NONE]: 'none',
  [Effects.SEPIA]: 'sepia',
  [Effects.CHROM]: 'grayscale',
  [Effects.MARVIN]: 'invert',
  [Effects.PHOBOS]: 'blur',
  [Effects.HEAT]: 'brightness',
};

const EFFECT_CONFIG = {
  [Effects.NONE]:  {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 1,
  },
  [Effects.SEPIA]:  {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [Effects.CHROM]:  {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  [Effects.MARVIN]:  {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  [Effects.PHOBOS]:  {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  [Effects.HEAT]:  {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
};

noUiSlider.create(sliderElement, {...EFFECT_CONFIG[Effects.NONE], connect: 'lower'});

const setEffect = (currentEffect) => {
  uploadImage.classList.remove(`effects__preview--${uploadImage.dataset.id}`);
  uploadImage.classList.add(`effects__preview--${currentEffect}`);
  uploadImage.dataset.id = currentEffect;

  sliderElement.noUiSlider.updateOptions(EFFECT_CONFIG[currentEffect]);
};

const onEffectsContainerClick = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const currentEffect = evt.target.value;
    setEffect(currentEffect);
  }
};

const resetEffect = () => {
  setEffect(Effects.NONE);
};

const getUnitsEffect = (currentEffect) => {
  switch (currentEffect) {
    case 'marvin': return '%';
    case 'phobos': return 'px';
    default: return '';
  }
};

const setIntensityEffect = (value) => {
  const currentEffect = uploadImage.dataset.id;
  if (currentEffect === 'none') {
    uploadImage.style.filter = null;
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
    uploadImage.style.filter = `${EffectsToFilterName[currentEffect]}(${value}${getUnitsEffect(currentEffect)})`;
  }
};

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  sliderValue.value = value;
  setIntensityEffect(value);
});

effectsContainer.addEventListener('click', onEffectsContainerClick);

export { resetEffect };
