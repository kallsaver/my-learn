// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: [
    "standard",
    "plugin:vue/essential"
  ],
  // required to lint *.vue files
  plugins: [
    "html"
  ],
  // add your custom rules here
  rules: {
    "arrow-parens": "off",
    "comma-dangle": ["off"],
    "eol-last": "off",
    "generator-star-spacing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "no-unused-vars": "off",
    "no-useless-constructor": "off"
  }
}
