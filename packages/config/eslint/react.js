module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: { react: { version: 'detect' } },
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
  plugins: ['react'],
  extends: [
    require.resolve('./base.js'),
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
};
