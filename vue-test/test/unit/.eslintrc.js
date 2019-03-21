module.exports = {
  "env": {
    "mocha": true
  },
  "globals": {
    "expect": true,
    "sinon": true
  },
  "rules": {
    "arrow-parens": "off",
    "comma-dangle": ["off"],
    "eol-last": "off",
    "generator-star-spacing": "off",
    "space-before-function-paren": ["error",
      {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
      }
    ],
    "no-unused-vars": "off",
    "no-useless-constructor": "off"
  }
}
