<template>
  <page
    :title="$route.meta.title">
    <div class="Object.defineProperty"></div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo2()
  },
  methods: {
    demo1() {
      function observeProperty(obj, key, fn) {
        let val = obj[key]
        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get() {
            return val
          },
          set(newVal) {
            if (val === newVal) {
              return
            }
            val = newVal
            if (typeof fn === 'function') {
              fn(newVal)
            }
          }
        })
      }

      const person = {
        name: 'a'
      }

      observeProperty(person, 'name', () => {
        console.log('数据更新啦')
      })

      person.name = 'dfdf'
      person.name = 'dfdfgg'
      console.log(person.name)
    },
    demo2() {
      const person = {}
      Object.defineProperties(person, {
        name: {
          enumerable: true,
          configurable: true,
          value: 'po',
          writable: true
        },
        city: {
          enumerable: true,
          configurable: true,
          value: 'ps',
          writable: true
        }
      })

      console.log(person.name)
      console.log(person.city)
    }
  },
}
</script>

<style>

</style>
