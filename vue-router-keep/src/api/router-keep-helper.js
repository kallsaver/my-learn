import { globalCache, globalStack } from '../store/index'

const routerKeepHelper = {
  remove(key) {
    for (let i = 0; i < globalCache.length; i++) {
      const globalCacheItem = globalCache[i]
      const stack = globalCacheItem.stack
      const cache = globalCacheItem.cache
      if (cache[key]) {
        cache[key].componentInstance.$destroy()
        cache[key] = null
        globalStack.remove(key)
      }
    }
  },
  removeAll() {
    for (let i = 0; i < globalCache.length; i++) {
      const globalCacheItem = globalCache[i]
      const stack = globalCacheItem.stack
      const cache = globalCacheItem.cache
      for (const key in cache) {
        cache[key].componentInstance.$destroy()
        cache[key] = null
      }
    }
    globalStack.removeAll()
  },
  getStore() {
    return {
      cache: globalCache,
      stack: globalStack.getStore()
    }
  }
}

export default routerKeepHelper
