function createIdGenerator (prefix = '') {
  let lastGeneratedId = 0;

  return () => prefix + (lastGeneratedId += 1);
}

function isEscKey (evt) {
  return evt.key === 'Escape';
}

export { createIdGenerator, isEscKey };
