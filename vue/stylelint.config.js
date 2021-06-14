module.exports = {
  extends: 'stylelint-config-recommended-scss',
  plugins: ['stylelint-scss', 'stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'max-nesting-depth': [2, { ignore: ['pseudo-classes'] }]
  }
}
