module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [require.resolve('@archivist/config/eslint/react.js')],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  rules: {},
};
