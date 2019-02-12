<template>
  <page
    :title="$route.meta.title">
    <div class="async"></div>
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
      let target = {}
      let proxy = new Proxy(target, {})

      console.log(target === proxy)

      proxy.title = 5
      console.log(target.title)

      target.title = 6
      console.log(proxy.title)
    },
    demo2() {
      let person = {
        name: 'a'
      }

      let proxy = new Proxy(person, {
        get(target, property) {
          if (property in target) {
            console.log('get')
            return target[property]
          } else {
            throw new ReferenceError('error')
          }
        }
      })

      console.log(proxy.name)
      console.log(proxy.title)
    },
    demo3() {
      let proxy = new Proxy({}, {
        get(target, property, receiver) {
          console.log(receiver === proxy)
          return 1
        }
      })
      // 得到get的返回值
      console.log(proxy.getReceiver)
    },
    demo4() {
      // let validator = {
      //   set(obj, prop, value) {
      //     if (prop === 'age') {
      //       console.log('age')
      //     }
      //   }
      // }

      // let person = new Proxy({}, validator)

      // person.age = 100
    },
  },
}
</script>

<style>

</style>
