<template>
  <page
    :title="$route.meta.title">
    <div class="class">
    </div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo4()
  },
  methods: {
    demo1() {
      // map的键名等价性判断是通过调用Object.is来实现的
      // Object.is和====不同的是
      // 1. NaN和NaN是相同的
      // 2. +0和-0是不同的
      /* eslint-disable */
      // false
      console.log(NaN === NaN)
      // true
      console.log(Object.is(NaN, NaN))
      /* eslint-disable */
      // true
      console.log(+0 === -0)
      // false
      console.log(Object.is(+0, -0))
    },
    demo2() {
      const map = new Map()
      const key1 = {}
      const key2 = {}

      map.set(key1, 1)
      map.set(key2, 2)

      console.log(map.get(key1))
    },
    demo3() {
      // Map除了添加外(Set是add),其它方法和Set一致
      const map = new Map()
      map.set('name', 'a')
      map.set('age', 20)

      console.log(map.size)
      console.log(map.has('name'))
      console.log(map.get('name'))
      map.delete('age')
      map.clear()
      console.log(map)
    },
    demo4() {
      const data = [['name', 's'], ['age', '3']]
      const map = new Map(data)
      console.log(map)
      for (const [key, value] of map) {
        console.log(value, key)
      }
    }
  },
}
</script>

<style>

</style>
