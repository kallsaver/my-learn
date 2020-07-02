function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    configurable: true,
    writable: true
  })
}
const arrayProto = Array.prototype
const  arrayMethods = Object.create(arrayProto)

const arrayList = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

arrayList.forEach(method => {
  const original = arrayMethods[method]
  def(arrayMethods, method, function () {
    const args = Array.prototype.slice.call(arguments)
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) {
      ob.observeArray(inserted)
    }
    ob.dep.notify()
    return result
  })
})

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
function protoAugment(target, src) {
  target.__proto__ = src
}

function copyAugment(target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

function Observer(value) {
  this.value = value
  this.dep = new Dep()
  def(value, '__ob__', this)
  if (Array.isArray(value)) {
    const augment = hasProto
      ? protoAugment
      : copyAugment
    augment(value, arrayMethods, arrayKeys)
    this.observeArray(value)
  } else {
    this.walk(value)
  }
}

Observer.prototype = {
  walk: function (obj) {
    Object.keys(obj).forEach(key => {
      defineReactive$$1(obj, key, obj[key])
    })
  },
  observeArray: function (items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

function defineReactive$$1(obj, key, val) {
  const dep = new Dep()
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
      }
      return val
    },
    set: function (newVal) {
      if (val === newVal || (newVal !== newVal && val !== val)) {
        return
      }
      val = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

function observe(value) {
  if (!value || typeof value !== 'object') {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

let uid = 0
function Dep() {
  this.id = uid++
  this.subs = []
}
Dep.target = null
Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  removeSub: function (sub) {
    const index = this.subs.indexOf(sub)
    if (index !== -1) {
      this.subs.splice(index, 1)
    }
  },
  notify: function () {
    this.subs.forEach((sub) => {
      sub.update()
    })
  },
  depend: function () {
    Dep.target.addDep(this)
  }
}

function Watcher(vm, expOrFn, cb) {
  this.vm = vm
  expOrFn = expOrFn.trim()
  this.expOrFn = expOrFn
  this.cb = cb
  this.depIds = {}

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn
  }
  else {
    this.getter = this.parseGetter(expOrFn)
  }
  this.value = this.get()
}

Watcher.prototype = {
  update() {
    this.run()
  },
  run(){
    const newVal = this.get()
    const oldVal = this.value
    if (newVal === oldVal) {
      return
    }
    this.value = newVal
    this.cb.call(this.vm, newVal, oldVal)
  },
  get: function () {
    Dep.target = this
    const value = this.getter.call(this.vm, this.vm)
    Dep.target = null
    return value
  },
  addDep: function (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  },
  parseGetter: function (exp) {
    if (/[^\w.$]/.test(exp)) {
      return
    }

    const exps = exp.split('.')

    return function (obj) {
      for (let i = 0, len = exps.length; i < len; i++) {
        if (!obj) {
          return
        }
        obj = obj[exps[i]]
      }
      return obj
    }
  }
}

function Compile(el, vm) {
  this.$vm = vm
  this.$el = this.isElementNode(el) ? el : document.querySelector(el)

  if (this.$el) {
    this.$fragment = this.nodeFragment(this.$el)
    this.compileElement(this.$fragment)
    this.$el.appendChild(this.$fragment)
  }
}

Compile.prototype = {
  isElementNode(node) {
    return node.nodeType === 1
  },
  isTextNode(node) {
    return node.nodeType === 3
  },
  isDirective(attr) {
    return attr.indexOf('v-') === 0
  },
  isEventDirective(dir) {
    return dir.indexOf('on') === 0
  },
  nodeFragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  },
  compileElement(el) {
    const childNodes = el.childNodes
    Array.prototype.slice.call(childNodes).forEach((node) => {
      const text = node.textContent
      const reg = /\{\{((?:.|\n)+?)\}\}/

      if (this.isElementNode(node)) {
        this.compile(node)
      } else if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, RegExp.$1)
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node)
      }
    })
  },
  compile(node) {
    const nodeAttrs = node.attributes
    Array.prototype.slice.call(nodeAttrs).forEach((attr) => {
      const attrName = attr.name
      if (this.isDirective(attrName)) {
        const exp = attr.value
        const dir = attrName.slice(2)
        if (this.isEventDirective(dir)) {
          compileUtil.eventHandler(node, this.$vm, exp, dir)
        }
        else {
          compileUtil[dir] && compileUtil[dir](node, this.$vm, exp)
        }
      }
    })
  },
  compileText(node, exp) {
    node.textContent = this.$vm[exp]
  }
}

const compileUtil = {
  eventHandler(node, vm, exp, dir) {
    const eventType = dir.split(':')[1]
    const fn = vm.$options.methods && vm.$options.methods[exp]
    node.addEventListener(eventType, fn.bind(vm), false)
  },
  model(node, vm, exp) {
    this.bind(node, vm, exp, 'model')
    node.addEventListener('input', (e) => {
      const newVal = e.target.value
      clearTimeout(timer)
      timer = setTimeout(() => {
        this._setVmVal(vm, exp, newVal)
      })
    })
  },
  bind(node, vm, exp, dir) {
    const updaterFn = updater[dir + 'Updater']
    updaterFn && updaterFn(node, this._getVmVal(vm, exp))
  },
  _getVmVal(vm, exp) {
    const exps = exp.split('.')
    let val = vm
    for (let i = 0, len = exps.length; i < len; i++) {
      if (!val) {
        return
      }
      val = val[exps[i]]
    }
    return val
  },
  _setVmVal(vm, exp, value) {
    const exps = exp.split('.')
    let val = vm
    exps.forEach((key, index) => {
      if (index < exps.length - 1) {
        val = val[key]
      }
      else {
        val[key] = value
      }
    })
  }
}

let timer = null

const updater = {
  htmlUpdater(node, value) {
    node.innerHTML = value
  },
  textUpdater(node, value) {
    node.textContent = value
  },
  modelUpdater(node, value) {
    node.value = value
  }
}

// 未实现数据层 => 视图层更新
function MVVM(options) {
  this.$options = options || {}
  const data = this._data = this.$options.data
  Object.keys(data).forEach(key => {
    this._proxyData(key)
  })
  observe(data, this)
  new Compile(this.$options.el, this)
  options.mounted.call(this)
}

MVVM.prototype = {
  _proxyData(key) {
    Object.defineProperty(this, key, {
      configurable: false,
      enumerable: true,
      get() {
        return this._data[key]
      },
      set(newVal) {
        this._data[key] = newVal
      }
    })
  },
}

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

const UA = window.navigator.userAgent.toLowerCase()

const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA))

function noop() { }

let isUsingMicroTask = false

const callbacks = []
let pending = false

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) {
      setTimeout(noop)
    }
  }
  isUsingMicroTask = true
} else if (typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

function nextTick(cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        console.log(e)
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    // 触发callbacks
    timerFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

// 1, 2 都会存放在一次微任务队列中的执行栈中
nextTick(() => {
  console.log('cb 1')
})

nextTick(() => {
  console.log('cb 2')
})

nextTick().then(() => {
  console.log('no cb')
})
