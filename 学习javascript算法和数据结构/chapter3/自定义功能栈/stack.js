// 实现keep-alive的管理
// 一个shift/unshift的头栈

class Stack {
  // 设置最大存储
  constructor(maxLength) {
    this.maxLength = maxLength
    this.init()
  }
  init() {
    this.list = []
  }
  // 添加已存在元素时添加无效,原元素位置置顶
  _add(element) {
    const index = this.list.findIndex((item) => {
      return item === element
    })
    if (index !== -1) {
      this.list.splice(index, 1)
    }
    this.list.unshift(element)
    if (this.list.length > this.maxLength) {
      this.list.pop()
    }
  }
  // _add支持多参数版
  add() {
    for (let i = 0; i < arguments.length; i++) {
      let element = arguments[i]
      this._add(element)
    }
  }
  // 快捷删除头元素,相当于backToByIndex(1)
  reduce() {
    if (!this.list.length) {
      return false
    }
    return this.list.shift()
  }
  // 先reduce再add,清空当前头元素的记录
  replace(element) {
    let result = this.reduce()
    if (!result) {
      return false
    }
    this._add(element)
  }
  // 删除从这个元素连同在这个元素前面先添加的元素都删除
  removeFrom(element) {
    const index = this.list.findIndex((item) => {
      return item === element
    })
    if (index !== -1) {
      return this.list.splice(index)
    }
    return false
  }
  // 删除指定的元素
  remove(element) {
    const index = this.list.findIndex((item) => {
      return item === element
    })
    if (index === -1) {
      return false
    }
    return this.list.splice(index, 1)
  }
  // 清除所有数据
  clearAll() {
    return this.list.splice(0)
  }
  // 清除除了参数以外的数据
  clearExclude() {
    for (let i = 0; i < this.list.length; i++) {
      let item = this.list[i]
      if (Array.prototype.indexOf.call(arguments, item) === -1) {
        this.list.splice(i, 1)
        i--
      }
    }
  }
  // 删除在这个元素后面添加的元素
  backTo(element) {
    const index = this.list.findIndex((item) => {
      return item === element
    })
    if (index === -1) {
      return false
    }
    return this.list.splice(0, index)
  }
  // 后退index步,如果没有index步,清空全部
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
  getList() {
    return this.list
  }
  has(element) {
    const index = this.list.findIndex((item) => {
      return item === element
    })
    return index !== -1
  }
}
