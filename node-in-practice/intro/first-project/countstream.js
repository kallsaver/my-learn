const util = require('util')
const Writable = require('stream').Writable

util.inherits(CountStream, Writable);

function CountStream(matchText, options) {
  Writable.call(this, options)
  this.count = 0
  this.matcher = new RegExp(matchText, 'ig')
}

CountStream.prototype._write = function (chunk, encoding, cb) {
  const matches = chunk.toString().match(this.matcher)
  if (matches) {
    this.count += matches.length
  }
  cb()
}

CountStream.prototype.end = function () {
  // emit是Writable原型链上的方法
  this.emit('total', this.count)
}

module.exports = CountStream
