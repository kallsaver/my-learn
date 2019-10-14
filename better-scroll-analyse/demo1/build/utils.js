const path = require('path')
const os = require('os')

const resolve = (p) => {
  return path.resolve(__dirname, '../', p);
}

const getIPAddress = () => {
  let interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

module.exports = {
  resolve,
  getIPAddress
}

