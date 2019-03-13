let fs = require("fs")
let path = require("path")

let src = path.join(__dirname, './src/images/png/1.txt')

// 同步递归创建目录
function mkdirsSync(dirname) {
  //console.log(dirname)
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

let txt = path.join(__dirname, './source')


function writeFileSync(fileName) {
  let dirname = fileName.replace(/(.*)\\.*/, '$1')
  mkdirsSync(dirname)
}

writeFileSync(src)

// mkdirsSync(src)
