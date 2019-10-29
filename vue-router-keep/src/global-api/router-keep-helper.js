export const store = []

export const routerKeepHelper = {
  remove(key) {
    for (let i = 0; i < store.length; i++) {
      const storeItem = store[i]
      const stack = storeItem.stack
      const cache = storeItem.cache
      if (cache[key]) {
        cache[key].componentInstance.$destroy()
        cache[key] = null
        stack.remove(key)
      }
    }
  },
  removeAll() {
    for (let i = 0; i < store.length; i++) {
      const storeItem = store[i]
      const stack = storeItem.stack
      const cache = storeItem.cache
      for (const key in cache) {
        cache[key].componentInstance.$destroy()
        cache[key] = null
      }
      stack.removeAll()
    }
  },
}
