// 不适用于单页面应用

window.navigationStart = performance.timing.navigationStart || window.navigationStart

// 基准值
const innerHeight = window.innerHeight

function getOffsetTop(el) {
  let offsetTop = el.offsetTop
  let offsetParent = el.offsetParent
  while (offsetParent) {
    offsetTop += offsetParent.offsetTop
    offsetParent = offsetParent.offsetParent
  }
  return offsetTop
}

const images = document.querySelectorAll('img')
let firstScreenImageCount = 0
let firstScreenImageLoadCount = 0

for (const item of images) {
  const offsetTop = getOffsetTop(item)
  if (offsetTop <= innerHeight) {
    firstScreenImageCount++
    // DEV: 用事件委托
    item.addEventListener('load', () => {
      firstScreenImageLoadCount++
      if (firstScreenImageCount === firstScreenImageLoadCount) {
        console.log('首屏的图片全部加载完成1')
        getFirstScreenTime()
      }
    }, false)

    item.addEventListener('error', () => {
      firstScreenImageCount--
      if (firstScreenImageCount === firstScreenImageLoadCount) {
        console.log('首屏的图片全部加载完成2')
        getFirstScreenTime()
      }
    })
  }
}

if (!firstScreenImageCount) {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoade')
    getFirstScreenTime()
  }, false)
}

function getFirstScreenTime() {
  const firstScreenTime = Date.now() - window.navigationStart
  console.log(firstScreenTime)
  return firstScreenTime
}
