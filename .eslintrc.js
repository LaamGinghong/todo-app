module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb-base',
    'plugin:eslint-comments/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  settings: {
    'import/resolver': {},
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {},
}
