function Observe(value) {
  this.value = value
  this.deepObserve(value)
}

Observe.prototype = {
  deepObserve: function (obj) {
    if (!obj || typeof obj !== 'object') {
      return
    }
    Object.keys(obj).forEach(key => {
      this.observeProperty(obj, key, obj[key])
    })
  },
  observeProperty: function (obj, key, val) {
    // val闭包
    this.deepObserve(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        return val
      },
      set: function (newVal) {
        if (val === newVal) {
          return
        }
        console.log('数据更新啦 ', val, '=>', newVal)
        val = newVal
      }
    })
  }
}

let uid = 0

function Dep() {
  this.id = uid++
  this.subs = []
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  removeSub: function (sub) {
    let index = this.subs.indexOf(sub)
    if (index !== 1) {
      this.subs.splice(index, 1)
    }
  },
  notify: function () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  },
  depend: function () {

  }
}

function Compile(el, value) {
  this.$val = value
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)
  if (this.$el) {
    this.compileElement(this.$el)
  }
}

Compile.prototype = {
  compileElement: function (el) {
    let childNodes = el.childNodes
    Array.prototype.slice.call(childNodes).forEach((node) => {
      let text = node.textContent
      let reg = /\{\{((?:.|\n)+?)\}\}/
      // 如果是element节点
      if (this.isElementNode(node)) {
        this.compile(node)
      }
    })
  },
  isElementNode: function (node) {
    return node.nodeType === 1
  },
  compile: function (node) {
    let nodeAttrs = node.attributes
    Array.prototype.slice.call(nodeAttrs).forEach((attr) => {
      console.log(attr)
      let attrName = attr.name
      // if (this.isDirective(attrName)) {
      //   this exp = attr.value
      //   node.innerHTML = typeof this.$val[exp] === 'undefined' ? '' : this.$val[exp]
      //   node.removeAttribute(attrName)
      // }
    })
  },
}


