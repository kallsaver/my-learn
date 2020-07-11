<template>
  <page
    :title="$route.meta.title">
    <div class="promise"></div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo4()
  },
  methods: {
    // promise的执行先后
    demo1() {
      const p1 = new Promise((resolve) => {
        console.log(1)
        // 异步的
        resolve()
        console.log(2)
      })

      setTimeout(() => {
        console.log(5)
      }, 0)

      p1.then((data) => {
        console.log(4)
      })

      console.log(3)
    },
    // promise可以在then后面return改值
    demo2() {
      const data1 = {
        name: 'data1'
      }

      const data2 = {
        name: 'data2'
      }

      const data3 = {
        name: 'data3'
      }

      const p1 = new Promise((resolve) => {
        resolve(data1)
      })

      const p2 = p1.then((data) => {
        // 相当于产生了新的resolve的Promise
        return data2
      })

      const p3 = p1.then((data) => {
        // 相当于产生了新的reject的Promise
        throw new Error('error')
      })

      p2.then((data) => {
        console.log(data)
        console.log('p2', p2)
      })

      const p4 = p3.then((data) => {
      }).catch((err) => {
        console.log('err', err)
        // 相当于产生了新的resolve的Promise
        return data3
      })

      p4.then((data) => {
        console.log(data)
        console.log(p4)
      })
    },
    // then返回新的promise
    demo3() {
      let a

      const p1 = new Promise((resolve) => {
        resolve()
      }).then((data) => {
        // 相当于return {name: 's'},
        // 不同的是外层是另一个新的promise并且解析了a的resolve
        a = new Promise((resolve) => {
          resolve({ name: 's' })
        })
        return a
      })

      p1.then((data) => {
        console.log(p1 === a)
        console.log(p1)
        console.log(data)
      })
    },
    // promise指针传递
    demo4() {
      const p1 = new Promise((resolve) => {
        resolve()
      })

      const p2 = new Promise((resolve) => {
        resolve()
      }).then(() => {
        return p1.then(() => {
          // p2最终拿到的是这个新的Promise
          return {
            name: 's'
          }
        })
      })

      p2.then((data) => {
        console.log(data)
      })
    }
  },
}
</script>

<style>

</style>
