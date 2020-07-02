// 设计一个带next钩子的类,不执行钩子,生命周期不会触发
class Node {
  constructor(options) {
    this.hooks = ['before', 'middle', 'after']
    this.options = options
    this.map = {}
  }

  run() {
    for (let i = 0; i < this.hooks.length; i++) {
      const hook = this.hooks[i]
      this.options[hook](() => {
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

// node.run()

// 缺点:基于同步流程
function compose(middleware, ...rest) {
  dispatch(0, ...rest)
  function dispatch(i) {
    const fn = middleware[i]
    if (!fn) {
      return
    }
    fn(...rest, function next() {
      dispatch(i + 1)
    })
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

// http(app)

function koa2Compose(middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) {
        fn = next
      }
      if (!fn) {
        return Promise.resolve()
      }
      try {
        return Promise.resolve(fn(context, function next() {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

const fn1 = async (ctx, next) => {
  // 把await去掉就不是洋葱模型了
  next()
  console.log(4)
}

const fn2 = async (ctx, next) => {
  console.log(2)
  await (() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
        console.log(3)
      }, 1000)
    })
  })()
}

const run = koa2Compose([fn1, fn2])

const ctx = {}

run(ctx).then(() => {
  console.log(5)
})
