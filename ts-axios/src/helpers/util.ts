const _toString = Object.prototype.toString

export function toRawType(val: any): string {
  return _toString.call(val).slice(8, -1)
}

export function isDate(val: any): val is Date {
  return toRawType(val) === 'Date'
}

export function isPlainObject(val: any): val is Object {
  return val && toRawType(val) === 'Object'
}
