/* eslint-disable no-undef */
module.exports = {
  printWidth: 100,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.html',
      options: {
        parser: 'html'
      }
    }
    // {
    //   files: '*.vue',
    //   options: {
    //     parser: 'vue'
    //   }
    // }
  ]
}
