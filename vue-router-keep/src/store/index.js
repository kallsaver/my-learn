import config from '../config/index'
import Stack from '../util/stack'

export const globalStack = new Stack(config.max)

export const globalCache = []
