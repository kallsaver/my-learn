// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    "ecmaVersion": 6,
  },
  env: {
    "node": true,
    "commonjs": true,
  },
  extends: [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // add your custom rules here
  rules: {
    'arrow-parens': 'off',
    // 对象的属性逗号不做限制
    "comma-dangle": ["off"],
    'eol-last': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off'
  }
}