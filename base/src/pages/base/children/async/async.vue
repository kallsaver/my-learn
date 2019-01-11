<template>
  <page
    :title="$route.meta.title">
    <div class="async">
    </div>
  </page>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.demo4()
  },
  methods: {
    demo1() {
      // async函数内部return语句返回的值
      // 会成为then方法回调函数的参数
      // 而async函数的返回值是Promise对象
      // 如果throw new Error这个Promise会reject
      async function f() {
        // 取得一个1 ~ 10的正整数
        let number = (Math.random() * 10 + 1) | 0
        if (number > 5) {
          return number
        } else {
          throw new Error('error')
        }
      }

      f().then((data) => {
        console.log(data)
      }).catch((error) => {
        console.warn(error)
      })
    },
    demo2() {
      // await的return值
      async function getData() {
        let a = await (() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(1)
            }, 1000)
          })
        })()
        console.log(a)
      }
      getData()
    },
    demo3() {
      // 最佳实践
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
        await (() => {
          console.log(777)
        })()
      })()
    },
    demo4() {
      // async的回调函数
      async function getData(fn) {
        if (fn && typeof fn === 'function') {
          await fn(1)
          console.log('回调函数执行完毕')
        }
      }

      getData((number) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log('业务逻辑')
            resolve()
          }, 3000)
        })
      })
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
