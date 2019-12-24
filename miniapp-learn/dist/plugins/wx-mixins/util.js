const _toString = Object.prototype.toString

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}

export function isArray(value) {
  return toRawType(value) === 'Array'
}

export function isPlainObject(value) {
  return toRawType(value) === 'Object'
}
