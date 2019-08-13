<template>
  <page
    :title="$route.meta.title">
    <div class="set"></div>
  </page>
</template>

<script>
export default {
  mounted() {
    // this.demo1()
    // this.demo2()
    // this.demo3()
    this.demo4()
  },
  methods: {
    demo1() {
      // 数组(或者具有 iterable 接口的其他数据结构)转化成Set
      // Set不会添加相同的值,类似===的判断,NaN在Set内部是相同的
      // 注: NaN === NaN false
      const set = new Set(['0', 0, 1, 2, 3, 4, 5, 5, NaN, NaN])
      // 遍历Set数据结构
      for (let i of set) {
        console.log('i', i)
      }
      // 获取元素个数
      console.log(set.size)
      // 转化成数组
      let arr = [...set]
      console.log('arr', arr)

      // 添加,返回set
      console.log(set.add(7))
      // 删除,如果有这个元素返回true,否则返回false
      console.log(set.delete('0'))
      // 判断是否有
      console.log(set.has(0))

      // 清空
      set.clear()

      console.log('s', set)
    },
    demo2() {
      let set = new Set(['red', 'green', 'blue'])

      for (let item of set.keys()) {
        console.log('keys', item)
      }

      for (let item of set.values()) {
        console.log('values', item)
      }
      // entries方法返回的遍历器,同时包括键名和键值
      // 所以每次输出一个数组,它的两个成员完全相等
      for (let item of set.entries()) {
        console.log('entries', item)
      }

      set.forEach((value, key) => {
        console.log('forEach', key + ' : ' + value)
      })
    },
    demo3() {
      // 数组的map和filter方法可以间接用于Set
      let set = new Set([0, 1, 2])
      set = new Set([...set].map((x) => {
        return x * 2
      }))
    },
    demo4() {
      // 利用Set做并集/交集,差集
      let a = new Set([1, 2, 3])
      let b = new Set([2, 3, 4])

      // 并集
      let union = new Set([...a, ...b])
      console.log(union)

      // 交集
      let intersect = new Set([...a].filter((x) => {
        return b.has(x)
      }))
      console.log(intersect)

      // a的差集
      let difference = new Set([...a].filter((x) => {
        return !b.has(x)
      }))
      console.log(difference)
    }
  },
}
</script>

<style lang="stylus">

</style>
