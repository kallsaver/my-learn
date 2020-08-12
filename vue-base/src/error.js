// window.onerror不能获得try, catch的错误
// 不能捕获图片,资源加载错误(需要用到捕获阶段来做)

function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

window.addEventListener('error', (event) => {
  const type = getType(event.constructor)
  let o
  if (type === 'Event') {
    const target = event.target
    const el = event.path[0]
    const { currentSrc } = target
    o = {
      type,
      el,
      currentSrc,
    }
  } else if (type === 'ErrorEvent') {
    const { filename, lineno, colno, message } = event
    o = {
      type,
      filename,
      lineno,
      colno,
      message
    }
  }
  // console.log(event)
  // console.log(type)
  // console.log(o)
}, true)

window.onunhandledrejection = function (event) {
  const o = {
    type: 'promise',
    message: event.reason,
  }
  // console.log(event)
  event.preventDefault()
}

function createError1() {
  throw new Error('dd')
}

function createError2() {
  const o = {}
  console.log(o.p())
  console.log(1)
}

function createError3() {
  const a = new Promise((resolve, reject) => {
    // eslint-disable-next-line
    reject('tttt')
  })

  a.then(() => {
    console.log(1)
  })
}

// createError1()
// createError2()
// createError3()
