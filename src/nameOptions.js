const toUpper = (name) => {
  name = name ? name : "";
  return name.toUpperCase();
};
const toUpperFirst = (name) => {
  name = name ? name : "";
  return name.charAt(0).toUpperCase() + name.slice(1);
};
const withOutLastChar = (name) => {
  name = name ? name : "";
  return name.slice(0, -1);
};

module.exports = {
  toUpper,
  toUpperFirst,
  withOutLastChar,
};
