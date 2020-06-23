// 出于安全考虑Service Worker必须在https协议下
// sw.js如果有变动,浏览器会自动重新执行Service Worker的install

// 版本号用自动化工具管理,webpack,gulp的占位符工具
const CACHE_NAME = 'v1.0.0'

const IGNORE = [
  // 不采用缓存的文件
  'no-cache',
  // api开头的接口不采用缓存
  'api',
]

const PRELOAD_FILE = [
  'css/index.css'
]

const MESSAGE = {}

// 当这个文件没有发生变化时不会触发
self.addEventListener('install', (event) => {
  console.log('install')
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    console.log('install waitUntil')
    return Promise.all([
      // 预加载并且缓存
      // addAll会触发请求(这里加入首页需要访问的资源),网页访问第二次就能访问到这里的资源
      // 在fetch回调里面的需要请求过资源才能加入缓存,网页访问第二次不一定能访问到
      cache.addAll([
        PRELOAD_FILE,
      ]),
      // 一定要执行self.skipWaiting()不然sw.js更新后activate不会执行
      self.skipWaiting()
    ])
  }))
})

self.addEventListener('activate', (event) => {
  console.log('activate', event)
  // event.waitUntil(self.clients.claim())
  event.waitUntil(caches.keys().then((cacheNames) => {
    console.log(cacheNames)
    return Promise.all(cacheNames.map((cacheName) => {
      // 删除失效版本的缓存
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName)
      }
    }))
  }))
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  // http容易被劫持,线下用https版本
  // if (request.url.indexOf('https') !== 0) {
  //   return
  // }
  const pathname = request.url.replace(/http(s)?:\/\/.*?\/(.*)/, '$2')
  let isIgnore = false
  for (let i = 0; i < IGNORE.length; i++) {
    const ignore = IGNORE[i]
    if (pathname.indexOf(ignore) === 0) {
      console.log('不缓存')
      isIgnore = true
    }
  }

  if (isIgnore || !MESSAGE.isUseCache) {
    event.respondWith(fetch(request))
  } else {
    // 截获请求
    // event.respondWith需要填入一个response的promise对象
    event.respondWith(caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cacheResponse) => {
        // 如果缓存有这个资源
        if (cacheResponse) {
          return cacheResponse
        }
        // 没有这个资源缓存则用fetch请求
        return fetch(request).then((response) => {
          if (response.status !== 200) {
            return response
          }
          // 加入缓存
          cache.put(request, response.clone())
          return response
        })
      })
    }))
  }
})

self.addEventListener('message', (event) => {
  console.log('message')
  const data = event.data
  MESSAGE.isUseCache = data.isUseCache
  MESSAGE.env = data.env
})
