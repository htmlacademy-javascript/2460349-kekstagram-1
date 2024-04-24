const isPalindrome = (string) => {
  const modifiedString = string
    .toLowerCase()
    .replaceAll(' ', '');
  let reverseString = '';
  for (let i = modifiedString.length - 1; i >= 0; i--) {
    reverseString += modifiedString.at(i);
  }
  return modifiedString === reverseString;
};

const getNumber = (value) => {
  let result = '';
  const strValue = value.toString();
  for (let i = 0; i < strValue.length; i++) {

    if (!Number.isNaN(parseInt(strValue.at(i), 10))) {
      result += strValue.at(i);
    }
  }
  return parseInt(result, 10);
};

const myPadStart = (string, minlength, pad) => {
  let result = string;
  while (result.length < minlength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minlength ? pad : pad.slice(0, minlength - newResultLength);
    result = actualPad + result;

    return result;
  }
};

const isLengthString = (string, length) => string.length <= length;

