/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './js/**/*.js',
    '../lib/*_web.ex',
    '../lib/*_web/**/*.*ex'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
 
      colors: {
        'opto-orange': '#f18c47',
        'opto-orange-light': '#ffe6d4',
        'opto-orange-dark': '#cc5500',
        'opto-bg-error': '#fef2f2',
        'opto-text-error': '#991b1b',
        'opto-bg-info': '#eff6ff',
        'opto-text-info': '#60a5fA'
      }
    },
  },
  variants: {},
  plugins: [],
}
