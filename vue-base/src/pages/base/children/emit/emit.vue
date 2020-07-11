<template>
  <page
    :title="$route.meta.title">
    <div class="emit">
      <div>{{name}}</div>
    </div>
  </page>
</template>

<script>
class Events {
  constructor() {
    this.map = {}
  }

  on(name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn)
      return
    }

    this.map[name] = [fn]
  }

  emit(name, ...args) {
    this.map[name].forEach((fn) => {
      fn(...args)
    })
  }
}
export default {
  data() {
    return {
      name: ''
    }
  },
  mounted() {
    const e = new Events()
    e.on('click', (name) => {
      this.name = name
    })
    setTimeout(() => {
      e.emit('click', 'a')
    }, 1000)
    console.log(window.innerHeight)
  },
}
</script>

<style>

</style>
