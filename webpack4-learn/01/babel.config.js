module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "targets": {
          "browsers": [
            "> 1%",
            "last 2 versions",
            "ie >= 10"
          ],
        },
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
}
