export const options = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import('@/pages/index/index.vue'),
  },
  // {
  //   path: '/index-list',
  //   component: () => import('@/pages/index-list/index-list.vue'),
  // },
  {
    path: '/base',
    component: () => import('@/pages/base/index.vue'),
    meta: {
      title: '基础',
    },
    children: [
      {
        path: '/base/emit',
        component: () => import('@/pages/base/children/emit/emit.vue'),
        meta: {
          title: '事件分发/自定义监听事件',
        },
      },
      {
        path: '/base/class',
        component: () => import('@/pages/base/children/class/class.vue'),
        meta: {
          title: 'class',
        },
      },
      {
        path: '/base/promise',
        component: () => import('@/pages/base/children/promise/promise.vue'),
        meta: {
          title: 'promise',
        },
      },
      {
        path: '/base/Symbol',
        component: () => import('@/pages/base/children/symbol/symbol.vue'),
        meta: {
          title: 'Symbol',
        },
      },
      {
        path: '/base/generator',
        component: () => import('@/pages/base/children/generator/generator.vue'),
        meta: {
          title: 'generator',
        },
      },
      {
        path: '/base/async',
        component: () => import('@/pages/base/children/async/async.vue'),
        meta: {
          title: 'async/await',
        },
      },
      {
        path: '/base/proxy',
        component: () => import('@/pages/base/children/proxy/proxy.vue'),
        meta: {
          title: 'proxy',
        },
      },
      {
        path: '/base/ObjectDefineProperty',
        component: () => import('@/pages/base/children/Object.defineProperty/Object.defineProperty.vue'),
        meta: {
          title: 'Object.defineProperty',
        },
      },
      {
        path: '/base/set',
        component: () => import('@/pages/base/children/set/set.vue'),
        meta: {
          title: 'Set',
        },
      },
      {
        path: '/base/map',
        component: () => import('@/pages/base/children/map/map.vue'),
        meta: {
          title: 'map',
        },
      },
      {
        path: '/base/decorator',
        component: () => import('@/pages/base/children/decorator/decorator.vue'),
        meta: {
          title: 'decorator',
        },
      },
    ]
  },
  {
    path: '/action',
    component: () => import('@/pages/action/index.vue'),
    meta: {
      title: '实战',
    },
    children: [
      // {
      //   path: '/action/promise',
      //   component: () => import('@/pages/action/children/promise/promise.vue'),
      //   meta: {
      //     title: 'promise',
      //   },
      // },
      {
        path: '/action/mvvm',
        component: () => import('@/pages/action/children/mvvm/mvvm.vue'),
        meta: {
          title: 'mvvm',
        },
      },
      {
        path: '/action/class',
        component: () => import('@/pages/action/children/class/class.vue'),
        meta: {
          title: 'class',
        },
      },
      {
        path: '/action/load-img',
        component: () => import('@/pages/action/children/load-img/load-img.vue'),
        meta: {
          title: 'load-img',
        },
      }
    ]
  },
  {
    path: '/vue',
    component: () => import('@/pages/vue/index.vue'),
    meta: {
      title: 'vue',
      index: 2
    },
    children: [
      {
        path: '/vue/cube-ui',
        component: () => import('@/pages/vue/children/cube-ui/cube-ui.vue'),
        meta: {
          title: 'cube-ui组件测试',
        },
      },
      {
        path: '/vue/vuex',
        component: () => import('@/pages/vue/children/vuex/vuex.vue'),
        meta: {
          title: 'vuex',
        },
      },
      {
        path: 'vue/async-components',
        component: () => import('@/pages/vue/children/async-components/async-components.vue'),
        meta: {
          title: 'async-components',
        },
      },
    ]
  },
  {
    path: '/browser',
    component: () => import('@/pages/browser/index.vue'),
    meta: {
      title: 'browser',
    },
    children: [
      {
        path: '/browser/repaints',
        component: () => import('@/pages/browser/children/repaints/repaints.vue'),
        meta: {
          title: '重排',
        },
      },
      {
        path: '/browser/timeline',
        component: () => import('@/pages/browser/children/timeline/timeline.vue'),
        meta: {
          title: '谷歌浏览器的performance',
        },
      },
      {
        path: '/browser/task',
        component: () => import('@/pages/browser/children/task/task.vue'),
        meta: {
          title: '渲染线程',
        },
      },
    ]
  },
  {
    path: '/animation',
    component: () => import('@/pages/animation/index.vue'),
    meta: {
      title: 'animation',
    },
    children: [
      {
        path: '/animation/hahow',
        component: () => import('@/pages/animation/children/hahow/hahow.vue'),
        meta: {
          title: 'hahow',
        },
      }
    ]
  }
]

function getBasePath(path) {
  return path.replace(/(.*)?\/:(.*)?/g, '$1')
}

function normalizeRoutes(options) {
  const routes = []
  for (let i = 0; i < options.length; i++) {
    const item = options[i]
    item.name = getBasePath(item.path)
    const route = createRoute(item)
    routes.push(route)
    const children = item.children
    const length = children && children.length
    if (length) {
      for (let j = 0; j < length; j++) {
        const item = children[j]
        item.name = getBasePath(item.path)
        const route = createRoute(item)
        routes.push(route)
      }
    }
  }
  return routes
}

function createRoute(item) {
  const route = {}
  route.path = item.path
  route.meta = item.meta
  route.redirect = item.redirect
  route.component = item.component
  route.name = item.name
  return route
}

const routes = normalizeRoutes(options)

export default routes
