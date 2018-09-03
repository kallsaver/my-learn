// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // tab四个空格
    "indent": ['error', 2],
    // 文件换行不做限制
    "eol-last": ["off"],
    // 语句结尾不能带空格不做限制
    "no-trailing-spaces": ["off"],
    // 语句结尾要带分号
    "semi": ["error", "always"],
    // json格式严格逗号不做限制
    "comma-dangle": ["off"],
    // 多余空行不做限制
    "no-multiple-empty-lines": ["error", {max: 100, maxBOF: 100,maxEOF: 100}],
    //
    "no-unused-vars": ["off"],
    // 函数名后面是否要带空格
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
    }],
  }
}
