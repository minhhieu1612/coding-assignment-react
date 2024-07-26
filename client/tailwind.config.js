/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    path.join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
