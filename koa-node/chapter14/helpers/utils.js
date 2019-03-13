const fs = require('fs')
const path = require('path')

module.exports = {
  mkdirsSync: function (dirname) {
    if (fs.existsSync(dirname)) {
      return true
    } else {
      if (this.mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname)
        return true
      }
    }
  },
  checkFileSync: function (fileName) {
    let dirname = fileName.replace(/(.*)\\.*/, '$1')
    this.mkdirsSync(dirname)
  },

}
