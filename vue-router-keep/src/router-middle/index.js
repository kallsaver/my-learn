import historyStack from '../history/history-stack'
import historyStateEvent from '../history/history-state-event'
import { EVENT_HISTORY_ACTION_BACK, EVENT_HISTORY_ACTION_GO } from '../history/history-action-name'

let isBack = false

historyStateEvent.on('back', () => {
  isBack = true
})

export const routerMiddle = (Vue, options) => {
  const router = options.router
  const actionKey = options.actionKey || 'actions'

  Vue.util.defineReactive(router.history, 'current', router.history.current, () => {
    Vue.nextTick(() => {
      historyStack.add(window.location.href)
    })
  })

  router.beforeEach((to, from, next) => {
    // let hashchange before next
    window.setTimeout(() => {
      if (isBack) {
        to.params[actionKey] = EVENT_HISTORY_ACTION_BACK
      } else {
        to.params[actionKey] = EVENT_HISTORY_ACTION_GO
      }
      isBack = false
      next()
    }, 0)
  })
}
