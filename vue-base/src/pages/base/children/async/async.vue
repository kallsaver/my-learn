<template>
  <page
    :title="$route.meta.title">
    <div class="async">
    </div>
  </page>
</template>

<script>
function getRandomInt(min, max) {
  return Math.random() * (max - min + 1) + min | 0
}
export default {
  data() {
    return {}
  },
  mounted() {
    this.demo6()
  },
  methods: {
    demo1() {
      // async可以脱离await,await不能脱离async
      // async函数内部return语句返回的值
      // 会成为then方法回调函数的参数
      // 而async函数的返回值是Promise对象
      // 如果throw new Error这个Promise会reject
      async function run() {
        // 取得一个1 ~ 10的正整数
        const number = getRandomInt(1, 10)
        if (number > 5) {
          return number
        } else {
          throw new Error('error')
        }
      }

      run().then((data) => {
        console.log(data)
      }).catch((error) => {
        console.warn(error)
      })
    },
    demo2() {
      // await的return值
      // await后面的函数如果是返回一个promise(说明是异步的),并且没有被then解析,那返回值是resolve的值
      // await后面的函数如果是返回一个promise(说明是异步的),并且没有被then解析,那返回值是最后一个then的返回值的值
      // await后面的函数如果不是返回一个promise,那么await不起作用(多余的)
      // promise的then和catch会自动return一个Promise,resolve的值是return的值
      function firstFn() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1)
          }, 1000)
        })
      }
      function SecondFn() {
        return 2
      }
      function thirdFn() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(3)
          }, 1000)
        }).then((res) => {
          return 3
        }).catch((err) => {
          return err
        }).then((res) => {
          console.log('---')
          return 30
        }).then((res) => {
          console.log(res)
          return 300
        })
      }
      function forthFn() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('miss token'))
          }, 1000)
        }).then((res) => {
          return 4
        }).catch((err) => {
          return err
        }).then((res) => {

        }, 1000)
      }
      async function run() {
        const firstResult = await firstFn()
        console.log('firstResult', firstResult)
        const secondResult = await SecondFn()
        console.log('secondResult', secondResult)
        const thirdResult = await thirdFn()
        console.log('thirdResult', thirdResult)
        const forthResult = await forthFn()
        console.log('forthResult', forthResult)
      }
      run()
    },
    demo3() {
      // async和循环
      let arr = [0, 1, 2]
      ;(async () => {
        for (let i = 0; i < arr.length; i++) {
          await (() => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(i)
                resolve()
              }, 1000)
            })
          })()
        }
        console.log(777)
      })()
    },
    demo4() {
      // async的回调函数(洋葱模型)
      function firstFn() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(1)
          }, 1000)
        })
      }
      async function run(next) {
        await firstFn()
        if (next && typeof next === 'function') {
          await next(2)
          console.log('回调函数执行完毕')
        }
      }

      run((number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('业务逻辑')
            resolve()
          }, 1000)
        })
      })
    },
    demo5() {
      // async/await用try/catch处理异常
      function firstFn() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('miss token'))
          }, 1000)
        })
      }
      function SecondFn() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('success')
          }, 1000)
        })
      }
      async function run() {
        try {
          const firstResult = await firstFn()
          // await函数reject没有被promise的catch处理,后面不再执行
          const secondResult = await SecondFn()
          console.log(firstResult, secondResult)
        } catch (err) {
          console.log(err)
        }
      }
      run()
    },
    demo6() {
      // async/await用to函数处理异常
      function to(promise) {
        return promise.then((data) => {
          return {
            err: null,
            data,
          }
        }).catch((err) => {
          return {
            err,
          }
        })
      }
      function getData() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('miss token'))
          }, 1000)
        })
      }
      function firstFn() {
        return new Promise((resolve, reject) => {
          getData().then(() => {
            resolve()
          }).catch(() => {
            reject(new Error('miss token'))
          })
        })
      }
      function SecondFn() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('success')
          }, 1000)
        })
      }
      async function run() {
        const firstResult = await to(firstFn())
        console.log(firstResult)
        if (firstResult.err) {
          console.log('报错')
          return
        }
        const secondResult = await to(SecondFn())
        console.log(secondResult)
      }
      run()
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
