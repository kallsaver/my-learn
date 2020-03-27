const util = require('util')

function Base() {
  this.name = 'base'
  this.speak = function () {
    console.log('speak')
  }
}

Base.prototype.showName = function () {
  console.log(this.name)
}

function Sub() {
  this.name = 'sub'
}

// inherits继承的是原型链上的属性,实例上的属性没有被继承
util.inherits(Sub, Base)

const sub = new Sub()

console.log(sub)

sub.showName()
