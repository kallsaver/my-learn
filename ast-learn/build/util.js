const path = require('path')
const fs = require('fs')
const treeify = require('treeify')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function readFileSync(path) {
  return fs.readFileSync(path, 'utf-8')
}

function writeFileSync(path, text) {
  return fs.writeFileSync(path, text,'utf-8')
}

function existsSync(filePath) {
  try {
    fs.statSync(filePath, fs.constants.R_OK | fs.constants.W_OK)
    return true
  } catch (err) {
    return false
  }
}

function mkdirSync(dir) {
  if (existsSync(dir)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dir))) {
      fs.mkdirSync(dir)
      return true
    }
  }
}

function printTree(o) {
  if (typeof o !== 'object' || o === null) {
    console.log(o)
    return
  }
  console.log(treeify.asTree(o, true))
}

const hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

const _toString = Object.prototype.toString

function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

function isObject(value) {
  return value !== null && typeof value === 'object'
}

function deepClone(value) {
  let ret
  const type = toRawType(value)
  if (type === 'Object') {
    ret = {}
  } else if (type === 'Array') {
    ret = []
  } else {
    return value
  }

  for (const key in value) {
    const copy = value[key]
    value[key] = deepClone(copy)
  }

  return ret
}

function deepAssign(origin, mixin) {
  for (const key in mixin) {
    const targetValue = origin[key]
    const mixinValue = mixin[key]
    if (!hasOwn(origin, key)) {
      origin[key] = mixinValue
    } else if (
      isObject(targetValue) &&
      isObject(mixinValue) &&
      toRawType(targetValue) === toRawType(mixinValue)
    ) {
      deepAssign(targetValue, mixinValue)
    }
  }
}

module.exports = {
  resolve,
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  printTree,
}
