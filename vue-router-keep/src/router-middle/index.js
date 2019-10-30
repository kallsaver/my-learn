import historyStack from '../history/history-stack'
import historyStateEvent from '../history/history-state-event'
import { EVENT_HISTORY_ACTION_BACK, EVENT_HISTORY_ACTION_FORWARD } from '../history/history-action-name'

let isBack = false

historyStateEvent.on(EVENT_HISTORY_ACTION_BACK, () => {
  historyStack.reduce()
  isBack = true
})

const routerMiddle = (Vue, config) => {
  const router = config.router
  const actionKey = config.actionKey

  router.beforeEach((to, from, next) => {
    // let hashchange I/0 callback before next
    window.setTimeout(() => {
      console.log('gg')
      if (isBack) {
        to.params[actionKey] = EVENT_HISTORY_ACTION_BACK
      } else {
        to.params[actionKey] = EVENT_HISTORY_ACTION_FORWARD
      }
      isBack = false
      next()
    }, 0)
  })

  Vue.util.defineReactive(router.history, 'current', router.history.current, () => {
    Vue.nextTick(() => {
      historyStack.add(window.location.href)
    })
  })
}

export default routerMiddle
