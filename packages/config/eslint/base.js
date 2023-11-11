module.exports = {
    parser: '@typescript-eslint/parser',
    env: {
        es2022: true
    },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'unused-imports',
        'simple-import-sort',
        'prettier',
        'unicorn',
        'import'
    ],
    rules: {},
    ignorePatterns: ['node_modules']
}