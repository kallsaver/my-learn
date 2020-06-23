// 环境变量development是开发环境,production是正式环境
const NODE_ENV = 'production'

// 开发环境不启动缓存
const isUseCache = NODE_ENV === 'development' ? false : true

// 更新版本后,已经访问过有bug页面的人会先读缓存的文件(因为sw是异步的)
// 要用户重新加载才会恢复,这个参数强制重新加载
const isForceReload = true

if ('serviceWorker' in navigator) {
  const SW = navigator.serviceWorker
  console.log('register')
  SW.register('/sw.js', {
    scope: '/'
  }).then((registration) => {
    const controller = SW.controller
    if (controller) {
      controller.postMessage({
        env: NODE_ENV,
        isUseCache,
      })
    }
    registration.onupdatefound = () => {
      const installing = registration.installing
      installing.onstatechange = () => {
        if (installing.state === 'activated') {
          if (isForceReload) {
            console.log('reload')
            window.location.reload()
          } else {
            const event = new Event('sw-refresh', {
              bubbles: true,
              cancelable: false,
            })
            window.dispatchEvent(event)
          }
        }
      }
    }
  })
}

window.addEventListener('sw-refresh', () => {
  console.log('sw-refresh')
}, false)
