import {
  isArray,
  isPlainObject,
} from './util'

const originProperties = [
  'data',
]

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html
const originMethods = [
  'onLoad',
  'onShow',
  'onReady',
  'onHide',
  'onUnload',
  'onPullDownRefresh',
  'onReachBottom',
  'onShareAppMessage',
  'onPageScroll',
  'onResize',
  'onTabItemTap',
]

const originPage = Page

function mergePageOptions(mixins, options) {
  mixins.forEach((mixin) => {
    if (!isPlainObject(mixin)) {
      throw new Error('mixin 类型必须为对象！')
    }
    // 递归mixins
    if (mixin.mixins) {
      mixin = mergePageOptions(mixin.mixins, mixin)
    }
    for (const key in mixin) {
      const value = mixin[key]
      if (originProperties.indexOf(key) !== -1) {
        // 如果有相同属性内置属性覆盖mixins属性
        options[key] = {
          ...value,
          ...options[key]
        }
      } else if (originMethods.indexOf(key) !== -1) {
        // mixins的方法先执行
        const originMethod = options[key]
        options[key] = function (...args) {
          value.call(this, ...args)
          return originMethod && originMethod.call(this, ...args)
        }
      } else {
        options[key] = value
      }
    }
  })
  return options
}

Page = (options) => {
  const mixins = options.mixins
  if (isArray(mixins)) {
    delete options.mixins
    options = mergePageOptions(mixins, options)
  }
  originPage(options)
}
