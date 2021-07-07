module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-css-modules',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true
  }
}
