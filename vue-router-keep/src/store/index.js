import config from '../config/index'
import Stack from '../util/stack'
import { defineReactive } from '../util/lang'

export const globalStack = new Stack(config.max)

export const globalCache = []

defineReactive(config, 'max', config.max, (newVal) => {
  globalStack.updateSize(newVal)
})
