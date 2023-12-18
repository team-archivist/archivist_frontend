/** @type {import('tailwindcss').Config} */

const path = require("path");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    path.join(
      path.dirname(require.resolve("@archivist/ui")),
      "**/*.{js,jsx,ts,tsx}"
    ),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
