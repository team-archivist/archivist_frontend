/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./stories/**/*.{js,jsx,ts,tsx}"],
  presets: [require("@archivist/config/tailwindcss/tailwind.preset.js")],
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
