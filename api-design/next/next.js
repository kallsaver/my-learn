// 设计一个带next钩子的类,不执行钩子,生命周期不会触发
class Node {
  constructor(options) {
    this.hooks = ['before', 'middle', 'after']
    const { before, middle, after } = options
    this.map = {}
    for (let i = 0; i < this.hooks.length; i++) {
      const hook = this.hooks[i]
      options[hook](() => {
        this.map[hook] = true
      })
      // 并非洋葱模型,如果是洋葱模型要使用递归
      if (!this.map[hook]) {
        return
      }
    }
  }
}

const node = new Node({
  before(next) {
    console.log('before')
    next()
  },
  middle(next) {
    console.log('middle')
    next()
  },
  after(next) {
    console.log('after')
  }
})

// 设计像express一样的洋葱模型的执行顺序
function compose(middleware, ...rest) {
  dispatch(0, ...rest)
  function dispatch(i) {
    const fn = middleware[i]
    if (fn && typeof fn === 'function') {
      fn(...rest, function next() {
        dispatch(i + 1)
      })
    }
  }
}

function express() {
  function app () {
    compose(app.middleware, ...arguments)
  }

  app.middleware = []

  app.use = function (fn) {
    this.middleware.push(fn)
  }

  return app
}

const app = express()

app.use((context, next) => {
  context.path = 'test'
  console.log(0)
  next()
  console.log(3)
  console.log(context.path)
})

app.use((context, next) => {
  console.log(1)
  next()
  console.log(2)
})

const http = function (handler) {
  handler({
    name: 'http'
  })
}

for (const key in app) {
  console.log(key)
}

http(app)

