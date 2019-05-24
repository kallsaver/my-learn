// plugins在.babelrc中写,presets需要在这里写
const babelRegister = require("babel-register")({
  "presets": [
    "env"
  ]
})

module.exports = require('./index.js')


