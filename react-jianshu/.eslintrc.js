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
    "react-app",
    "standard",
    "plugin:react/recommended",
  ],
  plugins: [
    "react",
    "react-hooks",
  ],
  // add your custom rules here
  rules: {
    "arrow-parens": "off",
    "comma-dangle": "off",
    "eol-last": "off",
    "generator-star-spacsing": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "lines-between-class-members": "off",
    "prefer-const": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
}
