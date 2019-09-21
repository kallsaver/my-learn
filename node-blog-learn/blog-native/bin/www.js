const http = require('http')
const portfinder = require('portfinder')

const serverHandler = require('../app')

const server = http.createServer(serverHandler)

let findPort = new Promise((resolve, reject) => {
  portfinder.basePort = 8066
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      resolve(port)
    }
  })
})

findPort.then((port) => {
  server.listen(port)
  console.log(`listen in localhost:${port}`)
})

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');

