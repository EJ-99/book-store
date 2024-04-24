const snakeToCamel = (str) => {
  return str.split('_').reduce((result, word, idx) => {
    if (idx === 0) return word;

    return result + word[0].toUpperCase() + word.slice(1);
  }, '');
};

const objectKeysToCamel = (obj) => {
  const result = {};
  Object.entries(obj).forEach(([key, value]) => {
    result[snakeToCamel(key)] = value;
  });

  return result;
};

module.exports = { objectKeysToCamel };
