/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8dd3bb',
        'hover-primary': '#305e4e',
        'red': '#c1121f',
        'black': '#000000',
      },
      fontFamily: {
        "BigShoulders": ["Big Shoulders Text"],
        "Montserrat": ["Montserrat"]
      }
    },
  },
  extend: {},
  plugins: [
    require("flowbite/plugin")
  ]
}
