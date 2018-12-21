function observe(data) {

}

function observeProperty(obj, key, val) {

}


let data = {
  a: 'a'
}

Object.defineProperty(data, 'a', {
  enumerable: true,
  configurable: true,
  get: function () {
    
  }
})
