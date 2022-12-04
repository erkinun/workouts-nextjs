module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint src --quiet --fix'],
  '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
};
