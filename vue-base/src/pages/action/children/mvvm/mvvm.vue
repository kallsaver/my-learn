<template>
  <page
    :title="$route.meta.title">
    <div class="mvvm">
    </div>
  </page>
</template>

<script>
import { observe } from './lib/observer/index.js'
import { createWatcher, createAsynWatcher } from './lib/observer/watcher.js'

export default {
  data() {
    return {
      list: [
        {
          value: 0
        },
        {
          value: 1
        }
      ],
      person: {
        city: {
          name: 'shenzhen'
        }
      }
    }
  },
  watch: {
    list: {
      handler(newVal) {
        console.log('newVal', newVal)
      },
      deep: true
    },
    'person.city.name': {
      handler(newVal) {
        console.log('newVal', newVal)
      }
    }
  },
  mounted() {
  },
  methods: {
    vue() {
      this.list[1].value = 990
      const listNew = [
        {
          value: 100
        },
        {
          value: 101
        }
      ]
      this.list = listNew
      listNew[1] = 990
      listNew[1] = 999
      this.$set(this, 'list', listNew)
    },
    test() {
      const list = [
        {
          value: 0
        },
        {
          value: 1
        }
      ]

      const person = {
        city: {
          name: 'ss'
        }
      }

      const vm = {
        data: {
          list: list,
          person: person
        }
      }
      observe(vm.data)

      // createAsynWatcher(vm.data, 'person.city.name', (newVal) => {
      //   console.log('person.city.name', newVal)
      // }, true)

      // vm.data.person.city.name = 'd'

      // const peronNew = {
      //   city: {
      //     name: 'a'
      //   }
      // }
      // vm.data.person = peronNew

      createAsynWatcher(vm.data, 'list', (newVal) => {
        console.log('list', newVal)
      }, true)

      const listNew = [
        {
          value: 100,
        },
        {
          value: 101,
        },
      ]

      // vm.data.list = listNew
      // list[1].value = 45

      const itemNew = {
        value: 1000
      }
      vm.data.list[1] = itemNew
      // itemNew.value = 1001
      // list[1].value = 101
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
