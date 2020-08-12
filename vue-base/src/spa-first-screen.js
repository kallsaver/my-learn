// 单页面应用首屏时间方案
// import autoComputeFirstScreenTime from 'auto-compute-first-screen-time'

// autoComputeFirstScreenTime({
//   onReport: function (result) {
//     if (result.success) {
//       console.log(result.firstScreenTime)
//     } else {
//       console.log(result)
//     }
//   }
// })

window.navigationStart = performance.timing.navigationStart || window.navigationStart

const store = []
let num = 0

const targetNode = document.body

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(() => {
  store.push({
    num,
    time: Date.now()
  })
  num++
  console.log(store)
})

observer.observe(targetNode, {
  childList: true,
  subtree: true,
})

function getFirstScreenTime() {
  const length = store.length
  const firstScreenTime = store[length - 1].time - window.navigationStart
  console.log(firstScreenTime)
  return firstScreenTime
}

let count = 0
let prevLength = 0
let currentLength = 0

const interval = setInterval(() => {
  currentLength = store.length
  if (currentLength === prevLength) {
    count++
  }
  if (count >= 10 && count > 0) {
    clearInterval(interval)
    getFirstScreenTime()
  }
  prevLength = currentLength
}, 30)
