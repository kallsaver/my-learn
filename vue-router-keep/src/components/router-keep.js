import Stack from '../util/stack'
import historyStack from '../history/history-stack'
import historyStateEvent from '../history/history-state-event'
import { EVENT_HISTORY_ACTION_BACK } from '../history/history-action-name'
import { store } from '../global-api/router-keep-helper'

function isDef(v) {
  return v !== undefined && v !== null
}

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

const COMPONENT_NAME = 'router-keep'

export default {
  name: COMPONENT_NAME,
  abstract: true,
  props: {
    max: {
      type: Number,
      default: 10,
      validator(num) {
        return (num | 0) === num
      }
    }
  },
  created() {
    this.cache = Object.create(null)
    this.stack = new Stack(this.max)
    store.push({
      cache: this.cache,
      stack: this.stack
    })
  },
  render(h) {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    if (vnode) {
      const key = window.location.href
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance
        this.stack.add(key)
      } else {
        if (this.max > this.stack.getSize()) {
          this.cache[key] = vnode
          this.stack.add(key)
        }
      }
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  },
  mounted() {
    this.historyStateBackHandler()
  },
  methods: {
    historyStateBackHandler() {
      historyStateEvent.on(EVENT_HISTORY_ACTION_BACK, () => {
        historyStack.reduce()
        this.remove(this.stack.getByIndex(0))
      })
    },
    remove(key) {
      this.removeCacheItem(key)
      this.removeStackItem(key)
    },
    removeCacheItem(key) {
      if (this.cache[key]) {
        this.cache[key].componentInstance.$destroy()
        this.cache[key] = null
      }
    },
    removeStackItem(key) {
      this.stack.remove(key)
    }
  },
  beforeDestroy() {
    let index = -1
    for (let i = 0; i < store.length; i++) {
      const item = store[i]
      if (item.cache === this.cache) {
        index = i
        break
      }
    }
    if (index !== -1) {
      store.splice(index, 1)
    }
    for (const key in this.cache) {
      this.removeCacheItem(key)
    }
    this.cache = null
    this.stack = null
  },
}
