module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
