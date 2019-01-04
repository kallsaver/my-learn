<template>
  <page
    :title="$route.meta.title">
    <div class="Object.defineProperty"></div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo1()
  },
  methods: {
    demo1() {
      function observeProperty(obj, key, fn) {
        let val = obj[key]
        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get() {
            console.log('val', val)
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

      let person = {
        name: 'a'
      }

      observeProperty(person, 'name', () => {
        console.log('数据更新啦')
      })

      person.name = 'dfdf'
      person.name = 'dfdfgg'
      console.log(person.name)
    }
  },
}
</script>

<style>

</style>
