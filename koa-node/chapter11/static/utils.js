var utils = {
  namespace: '__expire__',
  setItem: function (key, value, expire) {
    expire = expire || Number.MAX_VALUE
    var expireKey = this.namespace + key
    window.localStorage.setItem(expireKey, expire)
    var str = JSON.stringify(value)
    window.localStorage.setItem(key, str)
  },
  getItem: function (key) {
    var expireKey = this.namespace + key
    let expire = window.localStorage.getItem(expireKey)
    let value = JSON.parse(window.localStorage.getItem(key))
    let currentTime = new Date().getTime()
    if (expire && expire > currentTime) {
      return value
    } else {
      window.localStorage.removeItem(key)
      return null
    }
  },
  removeItem: function (key) {
    window.localStorage.removeItem(key)
  },
}
