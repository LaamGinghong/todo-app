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
  rules: {
    'import/extensions': [
      2,
      'ignorePackages',
      { ts: 'never', tsx: 'never', json: 'never', js: 'never' },
    ],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
  },
}
