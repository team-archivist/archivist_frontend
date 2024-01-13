/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets : [
    require( '@archivist/config/tailwindcss/tailwind.preset.js' ),
  ],
  plugins: [
  ],
};
