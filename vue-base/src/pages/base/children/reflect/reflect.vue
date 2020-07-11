<template>
  <page
    :title="$route.meta.title">
    <div class="async"></div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo1()
  },
  methods: {
    demo1() {
      const data = {
        name: 's'
      }

      const proxy = new Proxy(data, {
        get(target, key, receiver) {
          const result = Reflect.get(target, key, receiver)
          console.log('get')
          return result
        },
        set(target, key, val, receiver) {
          console.log('set')
          const result = Reflect.set(target, key, val, receiver)
          console.log(result)
          return result
        },
        deleteProperty(target, key) {
          const result = Reflect.deleteProperty(target, key)
          console.log(result)
          return result
        }
      })

      console.log(data.name)
      data.name = 'change'
      console.log(data.name)
      delete data.name
    }
  },
}
</script>

<style>

</style>
