var utils = {
  checkClass: function (o) {
    return Object.prototype.toString.call(o).slice(8, -1)
  },
  deepClone: function (o) {
    let ret
    let instance = this.checkClass(o)
    if (instance === 'Array') {
      ret = []
    } else if (instance === 'Object') {
      ret = {}
    } else {
      return o
    }

    for (let key in o) {
      let copy = o[key]
      ret[key] = deepClone(copy)
    }

    return ret
  },
  deepAssign: function (to, from) {
    for (let key in from) {
      if (!to[key] || typeof to[key] !== 'object') {
        to[key] = from[key]
      } else {
        this.deepAssign(to[key], from[key])
      }
    }
  },
   mulitDeepClone: function(target, ...rest) {
    for (let i = 0; i < rest.length; i++) {
      let source = this.deepClone(rest[i])
      this.deepAssign(target, source)
    }
    return target
  }
}
