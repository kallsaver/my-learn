const CountStream = require('./countstream')
const countStream = new CountStream('book')
var https = require('https')

console.log(countStream)

https.get('https://www.manning.com', function (res) {
  res.pipe(countStream)
})

countStream.on('total', function (count) {
  // console.log('Total matches:', count)
})

console.log(88)
console.log(8800)
