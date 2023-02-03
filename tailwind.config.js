/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./src/**/*{html,js,jsx}'],
  theme: {
    colors: {
      ...colors,
    },
  },
  plugins: [forms],
};
