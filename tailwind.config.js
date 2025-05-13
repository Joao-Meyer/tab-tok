/** @type {import('tailwindcss').Config} */

const colors = require('./src/presentation/style/palette/colors.json');
const plugin = require('tailwindcss/plugin');

export default {
  content: ['./index.html', './src/**/*.tsx'],
  darkMode: ['class', '[data-mode="dark"]'],
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('scrollbar', '&::-webkit-scrollbar');
    })
  ],
  theme: {
    colors,
    extend: {
      boxShadow: {
        base: '0px 12px 13px -8px rgba(0,0,0,0.04)'
      }
    },
    screens: {
      tablet: '768px',
      laptop: '1280px',
      desktop: '1540px'
    }
  }
};
