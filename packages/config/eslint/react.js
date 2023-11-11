module.exports = {
    extends: [
        require.resolve('./base.js'),
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    rules: {},
    settings: { react: { version: 'detect' } }
}