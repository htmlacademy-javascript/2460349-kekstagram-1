function createIdGenerator (prefix = '') {
  let lastGeneratedId = 0;

  return () => prefix + (lastGeneratedId += 1);
}

export { createIdGenerator };
