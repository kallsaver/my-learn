import { mulitDeepClone } from './utils.js'

function canWriteStorage(storage) {
  try {
    storage.setItem('@@', 1)
    storage.removeItem('@@')
    return true
  } catch (e) {
    console.warn('Invalid storage instance given')
  }
  return false
}

function setState(mutations) {
  console.log('mutations', mutations)
}

function setStorage(key, state, storage) {
  console.log(777)
}

export default function ({ subscribe } = {}) {
  return (store) => {
    // console.log(store)
    // 执行mutations后触发
    store.subscribe((mutations) => {
      if (subscribe && typeof subscribe === 'function') {
        subscribe(mutations, () => {
          setState(mutations)
        })
      }
    })
  }
}
