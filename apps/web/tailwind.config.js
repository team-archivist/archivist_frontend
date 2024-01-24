/** @type {import('tailwindcss').Config} */

const path = require("path");

const archivistUi = path.dirname(require.resolve("@archivist/ui"));

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    path.join(
      path.dirname(require.resolve("@archivist/ui")),
      "**/*.{js,jsx,ts,tsx}"
    ),
  ],
  presets: [require("@archivist/config/tailwindcss/tailwind.preset.js")],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
