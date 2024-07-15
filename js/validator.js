const form = document.querySelector('.img-upload__form');
const inputHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

function validateHashtags (value) {
  const regex = /^(#[a-zа-яё0-9]{1,19})?((\s#[a-zа-яё0-9]{1,19}){0,4})$/gmi;
  return regex.test(value);
}

function validateRepeat (value) {
  const result = value.split(' ');
  const uniqueHashtags = new Set(result);
  return uniqueHashtags.size === result.length;
}

pristine.addValidator (inputHashtags, validateHashtags, 'Никаких спецсимволов, длина одного хеш-тега не более 20 символов и до 5 штук', 1);
pristine.addValidator (inputHashtags, validateRepeat, 'Хеш-теги не должны повторяться', 2);


const onValidateSubmit = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

form.addEventListener('submit', onValidateSubmit);
