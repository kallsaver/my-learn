import('./src/a.js').then((a) => {
  console.log(a)
})

import { c } from './src/c.js'

const b = require('./src/b.js')

console.log(c())

console.log(1)
