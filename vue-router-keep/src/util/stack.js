export default class Stack {
  constructor(max = Infinity) {
    this.max = max
    this.init()
  }
  init() {
    this.list = []
  }
  _add(item) {
    const index = this.list.indexOf(item)
    if (index !== -1) {
      this.list.splice(index, 1)
    }
    this.list.unshift(item)
    if (this.list.length > this.max) {
      this.list.pop()
    }
  }
  add() {
    for (let i = 0; i < arguments.length; i++) {
      const item = arguments[i]
      this._add(item)
    }
  }
  reduce() {
    if (!this.list.length) {
      return false
    }
    return this.list.shift()
  }
  replace(item) {
    const result = this.reduce()
    if (!result) {
      return false
    }
    this._add(item)
  }
  removeFrom(item) {
    const index = this.list.indexOf(item)
    if (index !== -1) {
      return this.list.splice(index)
    }
    return false
  }
  remove(item) {
    const index = this.list.indexOf(item)
    if (index === -1) {
      return false
    }
    return this.list.splice(index, 1)
  }
  removeByIndex(index) {
    if (this.list[index]) {
      return this.list.splice(index, 1)
    }
  }
  removeAll() {
    return this.list.splice(0)
  }
  removeExclude() {
    for (let i = 0; i < this.list.length; i++) {
      const item = this.list[i]
      if (Array.prototype.indexOf.call(arguments, item) === -1) {
        this.list.splice(i, 1)
        i--
      }
    }
  }
  backTo(item) {
    const index = this.list.indexOf(item)
    if (index === -1) {
      return false
    }
    return this.list.splice(0, index)
  }
  backToByIndex(index) {
    if (index > this.list.length - 1) {
      return this.list.splice(0)
    }
    return this.list.splice(0, index)
  }
  getHeader() {
    return this.list[0]
  }
  getByIndex(index) {
    return this.list[index]
  }
  getFooter() {
    return this.list[this.list.length - 1]
  }
  getSize() {
    return this.list.length
  }
  getStore() {
    return this.list
  }
  has(item) {
    return this.list.indexOf(item) !== -1
  }
}
