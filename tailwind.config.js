/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ice-cream': {
          '50': '#eff8ff',
          '100': '#d8edff',
          '200': '#b8e3ff',
          '300': '#79ccff',
          '400': '#32b2fe',
          '500': '#079af0',
          '600': '#0079ce',
          '700': '#0061a6',
          '800': '#035289',
          '900': '#094571',
          '950': '#062b4b',
        },
        'chocolate': {
          '50': '#fdf4e6',
          '100': '#fcefd8',
          '200': '#f8dbb0',
          '300': '#f3c07e',
          '400': '#ed9c4a',
          '500': '#e88027',
          '600': '#da671c',
          '700': '#b54f19',
          '800': '#903f1c',
          '900': '#74361a',
          '950': '#3f1a0b',
        },

      }

    },
  },
  plugins: [],
}

