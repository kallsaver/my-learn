module.exports = {
  "presets": [
    'react-app'
  ],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-modules-commonjs"
  ],
  "env": {
    "test": {
      "presets": [
        "@babel/preset-env",
      ],
      "plugins": []
    }
  }
}
