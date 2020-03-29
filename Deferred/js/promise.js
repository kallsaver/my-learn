const _toString = Object.prototype.toString

function isArray(o) {
  return _toString.call(o).slice(8, -1) === 'Array'
}

function noop() {

}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor')
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
}

const PENDING = void 0
const FULFILLED = 1
const REJECTED = 2

function ES6Promise(resolver) {
  typeof resolver !== 'function' && needsResolver()

  this._result = undefined
  this._state = undefined
  this._subscribers = []

  initializePromise(this, resolver)

  return this
}

function initializePromise(promise, resolver) {
  try {
    resolver(function (value) {
      console.log(value)
    })
  } catch (e) {

  }
}


