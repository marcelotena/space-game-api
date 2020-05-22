exports.getRndInteger = (min, max) => {
  max++;
  return Math.floor(Math.random() * (max - min)) + min;
};