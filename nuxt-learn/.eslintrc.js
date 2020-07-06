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
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'generator-star-spacing': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'no-unused-vars': 'off',
    'no-useless-constructor': 'off',
    'lines-between-class-members': 'off',
    'vue/html-self-closing': 'off',
    'vue/multiline-html-element-content-newline': 'off',
  }
}
