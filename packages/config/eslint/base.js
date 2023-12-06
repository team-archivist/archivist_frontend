module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
    'simple-import-sort',
    'prettier',
    'unicorn',
    'import',
  ],
  extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  ignorePatterns: ['node_modules'],
};
