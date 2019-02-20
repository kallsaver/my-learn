import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import router from './router/index'

// Style组件是基础的依赖样式文件
import {
  /* eslint-disable no-unused-vars */
  Style,
  Button,
  Picker,
  Slide,
  Scroll,
  Popup,
  Toast,
  createAPI,
} from 'cube-ui'
import App from './App'
import SubscribeDialog from './components/subscribe-dialog/subscribe-dialog'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 并不是所有的图片都适合使用lazyload
// 使用本地路径地址的图片,使用require
// loading图应该要小
// https://github.com/hilongjw/vue-lazyload
// 这是基类上的设置,可以使用this.$Lazyload.config各组件配置自定义的设置
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 注意使用require语法
  error: require('./img/error.jpg'),
  loading: require('./img/loading.png'),
  // 尝试次数
  attempt: 3,
  // 触发请求正确图片地址的事件行为
  listenEvents: ['scroll', 'mousewheel', 'animationend', 'transitionend'],
  // 开启组件懒加载
  // 通常组件懒加载是通过webpack的懒加载实现(异步引入js)的
  // 但是使用webpack方式不好知道什么时候引入成功了,没有触发时机
  // <lazy-component></lazy-component>也是一个功能型的提供插槽和emit事件的组件
  // lazyComponent: true,
  // adapter: {
  //     loaded(listener, fromCache, Init) {
  //         console.log(listener);
  //     },
  //     loading(listener, Init) {
  //         // console.log('loading')
  //     },
  //     error(listener, Init) {
  //         // console.log('error')
  //     }
  // },
})

// 全局的路由跳转
// 一般用于登录逻辑
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

Vue.use(Button)
// Picker组件已经在install里面调用了createAPI
Vue.use(Picker)
// 滑块
Vue.use(Slide)
// 滚动条
Vue.use(Scroll)
// 遮罩层
Vue.use(Popup)
// 提示弹窗
Vue.use(Toast)

// 组成body上的组件,需要有name
// 参数是Vue,组件,组件上的自定义事件,生成的是否是单例
createAPI(Vue, SubscribeDialog, ['show', 'hide'], true)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
