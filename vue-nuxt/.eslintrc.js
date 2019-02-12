module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "arrow-parens": "off",
    // 对象的属性逗号不做限制
    "comma-dangle": ["off"],
    "eol-last": "off",
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "space-before-function-paren": "off",
    "no-unused-vars": "off",
    "no-useless-constructor": "off"
  }
}
