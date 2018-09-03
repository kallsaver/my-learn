module.exports = {
  root: true,
  parserOptions: {
    'ecmaVersion': 6,
  },
  env: {
    'node': true,
    'commonjs': true,
    'browser': true,
  },
  extends: [
    'standard'
  ],
  plugins: [
    'html'
  ],
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': ['off'],
    'eol-last': 'off',
    'generator-star-spacing': 'off',
    'space-before-function-paren': 'off',
  }
}
