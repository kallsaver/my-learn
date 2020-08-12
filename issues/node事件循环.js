// https://www.cnblogs.com/forcheng/p/12723854.html
// node的事件循环相比浏览器的事件循环,会按照事件队列进行细分为6个执行时机有先后的队列

// setTimeout(() => {
//   console.log('setTimeout1')
//   Promise.resolve().then(() => console.log('promise2'))
//   process.nextTick(() => console.log('nextTick1'))
// }, 0)

// setTimeout(() => {
//   console.log('setTimeout2')
//   Promise.resolve().then(() => console.log('promise3'))
//   process.nextTick(() => console.log('nextTick2'))
// }, 0)

// Promise.resolve().then(() => console.log('promise1'))


// node有六个循环阶段
// timer(setTimeout, setInterval的callback) => I/0 => idle,prepare(node内部使用) =>
// poll(轮循I/0队列) => check(setImmediate) => close callbacks

// process.nextTick在六个循环阶段

// const fs = require('fs')

// setTimeout(() => {
//   console.log('setTimeout1')
// }, 0)

// setImmediate(() => {
//   console.log('setImmediate2')
// }, 0)

// fs.readFile(__filename, () => {
//   setTimeout(() => {
//     console.log('setTimeout2')
//   }, 0)
//   setImmediate(() => {
//     console.log('setImmediate2')
//     process.nextTick(() => {
//       console.log('nextTick3')
//     })
//   })
//   Promise.resolve().then(() => console.log('promise1'))
//   process.nextTick(() => {
//     console.log('nextTick1')
//   })
//   process.nextTick(() => {
//     console.log('nextTick2')
//   })
// })

// test.js
const fs = require('fs');

console.log('mainline: start')
process.nextTick(() => {
  console.log('mainline: ', 'process.nextTick\n')
})

let counter = 0;
const interval = setInterval(() => {
  console.log('timers: setInterval.start ', counter)
  if (counter < 2) {
    setTimeout(() => {
      console.log('timers: setInterval.setTimeout')
      process.nextTick(() => {
        console.log('timers microtasks: ', 'setInterval.setTimeout.process.nextTick\n')
      })
    }, 0)

    fs.readdir('./', (err, files) => {
      console.log('poll: setInterval.readdir1')
      process.nextTick(() => {
        console.log('poll microtasks: ', 'setInterval.readdir1.process.nextTick')
        process.nextTick(() => {
          console.log('poll microtasks: ', 'setInterval.readdir1.process.nextTick.process.nextTick')
        })
      })
    })

    fs.readdir('./', (err, files) => {
      console.log('poll: setInterval.readdir2')
      process.nextTick(() => {
        console.log('poll microtasks: ', 'setInterval.readdir2.process.nextTick')
        process.nextTick(() => {
          console.log('poll microtasks: ', 'setInterval.readdir2.process.nextTick.process.nextTick\n')
        })
      })
    })

    setImmediate(() => {
      console.log('check: setInterval.setImmediate1')
      process.nextTick(() => {
        console.log('check microtasks: ', 'setInterval.setImmediate1.process.nextTick')
      })
    })

    setImmediate(() => {
      console.log('check: setInterval.setImmediate2')
      process.nextTick(() => {
        console.log('check microtasks: ', 'setInterval.setImmediate2.process.nextTick\n')
      })
    })
  } else {
    console.log('timers: setInterval.clearInterval')
    clearInterval(interval)
  }

  console.log('timers: setInterval.end ', counter)
  counter++;
}, 0);

console.log('mainline: end')
