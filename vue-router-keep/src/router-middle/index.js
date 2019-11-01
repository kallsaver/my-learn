import historyStack from '../history/history-stack'
import historyStateEvent from '../history/history-state-event'
import { EVENT_HISTORY_ACTION_BACK, EVENT_HISTORY_ACTION_FORWARD } from '../history/history-action-name'
import { defineReactive } from '../util/lang'

let isBack = false

historyStateEvent.on(EVENT_HISTORY_ACTION_BACK, () => {
  historyStack.reduce()
  isBack = true
})

const routerMiddle = (Vue, config) => {
  const router = config.router
  const actionKey = config.actionKey

  const originPush = router.push.bind(router)

  router.push = (location, onComplete, onAbort) => {
    console.log(location)
    console.log(onComplete)
    console.log(onAbort)
    originPush(location, onComplete, onAbort)
  }

  router.beforeEach((to, from, next) => {
    // let hashchange I/0 event trigger callback before next trigger to get right isBack
    window.setTimeout(() => {
      if (isBack) {
        to.params[actionKey] = EVENT_HISTORY_ACTION_BACK
      } else {
        to.params[actionKey] = EVENT_HISTORY_ACTION_FORWARD
      }
      isBack = false
      next()
    }, 0)
  })

  defineReactive(router.history, 'current', router.history.current, () => {
    Vue.nextTick(() => {
      historyStack.add(window.location.href)
    })
  })
}

export default routerMiddle
