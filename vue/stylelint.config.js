/* eslint-disable no-undef */
module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'max-nesting-depth': [2, { ignore: ['pseudo-classes'] }]
  }
}
