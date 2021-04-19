/* eslint-disable no-undef */
module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    // 'selector-max-id': 1,
    'selector-no-qualifying-type': 'ignore:'['class']
  }
}
