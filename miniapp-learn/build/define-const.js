const fs = require('fs')
const config = require('./config')

// 在dist目录中设置环境变量
function setEnv() {
  const NODE_ENV_PATTERN = /const\s+NODE_ENV\s*=\s*[\'\"]([^'"]*)[\'\"]/
  const NODE_ENV_REPLACE = `const NODE_ENV = '${process.env.NODE_ENV}'`
  fs.readFile(`${config.envFile}`, 'utf8', (err, files) => {
    const result = files.replace(NODE_ENV_PATTERN, NODE_ENV_REPLACE)
    fs.writeFile(`${config.envFile}`, result, 'utf8', function (err) {
      if (err) {
        console.log(err)
      }
    })
  })
}

// 在dist目录中设置开发环境用的本地host,本地图片服务器port
function setDevelopmentConst() {
  const HOST_PATTERN = /const\s+HOST\s*=\s*[\'\"]([^'"]*)[\'\"]/
  const HOST_REPLACE = `const HOST = '${config.host}'`

  const IMAGE_SERVER_PORT_PATTERN = /const\s+IMAGE_SERVER_PORT\s*=\s*[\'\"]([^'"]*)[\'\"]/
  const IMAGE_SERVER_PORT_REPLACE = `const IMAGE_SERVER_PORT = '${config.imgServerPort}'`

  fs.readFile(`${config.devFile}`, 'utf8', (err, files) => {
    const result = files.replace(HOST_PATTERN, HOST_REPLACE)
      .replace(IMAGE_SERVER_PORT_PATTERN, IMAGE_SERVER_PORT_REPLACE)
    fs.writeFile(`${config.devFile}`, result, 'utf8', function (err) {
      if (err) {
        console.log(err)
      }
    })
  })
}

module.exports = {
  setEnv,
  setDevelopmentConst
}
