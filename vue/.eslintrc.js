/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/arrow-body-style': 'off',
    '@typescript-eslint/prefer-arrow-callback': 'off',
    '@typescript-eslint/no-console': 'off',
    '@typescript-eslint/no-debugger': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
    // '@typescript-eslint/explicit-module-boundary-types': 'off',
    // '@typescript-eslint/no-unused-vars': 'off'
  },
  overrides: [
    {
      files: ['index.html'],
      rules: {
        'vue/comment-directive': 0
      }
    }
  ]
}
