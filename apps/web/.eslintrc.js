/** lint 공용설정을 사용합니다 */
module.exports = {
  extends: [
    require.resolve("@archivist/config/eslint/react.js"),
    "plugin:react/jsx-runtime",
  ],
  rules: {
    // for @emotion
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
    "react-hooks/rules-of-hooks": "off",
    "import/order": "off",
  },
};
