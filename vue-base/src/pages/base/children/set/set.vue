<template>
  <page
    :title="$route.meta.title">
    <div class="set"></div>
  </page>
</template>

<script>
export default {
  mounted() {
    this.demo2()
  },
  methods: {
    demo1() {
      // 数组(或者具有 iterable 接口的其他数据结构)转化成Set
      // Set不会添加相同的值,类似===的判断,NaN在Set内部是相同的
      // 注: NaN === NaN false
      const set = new Set(['0', 0, 1, 2, 3, 4, 5, 5, NaN, NaN])
      // 遍历Set数据结构
      for (const i of set) {
        console.log('i', i)
      }
      // 获取元素个数
      console.log(set.size)
      // 转化成数组
      const arr = [...set]
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
      // Set可接受for...of消费的数据结构
      // String,Array,Set,Map,有迭代器协议的数据结构
      const data = {
        list: [0, 1, 2],
        // 给for...of接口消费
        [Symbol.iterator]() {
          const list = this.list
          let i = 0
          // 返回一个迭代器(迭代器的本质)
          return {
            next() {
              const done = i >= list.length
              const value = !done ? list[i++] : undefined
              return {
                done,
                value,
              }
            }
          }
        }
      }
      const set = new Set(data)

      set.forEach((value, key) => {
        console.log('forEach', key + ' : ' + value)
      })
    },
    demo3() {
      // 数组的map和filter方法可以间接用于Set
      const set1 = new Set([0, 1, 2])
      const set2 = new Set([...set1].map((x) => {
        return x * 2
      }))
    },
    demo4() {
      // 利用Set做并集/交集,差集
      const a = new Set([1, 2, 3])
      const b = new Set([2, 3, 4])

      // 并集
      const union = new Set([...a, ...b])
      console.log(union)

      // 交集
      const intersect = new Set([...a].filter((x) => {
        return b.has(x)
      }))
      console.log(intersect)

      // a的差集
      const difference = new Set([...a].filter((x) => {
        return !b.has(x)
      }))
      console.log(difference)
    }
  },
}
</script>

<style lang="stylus">

</style>
