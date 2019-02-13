<template>
  <div id="app" class="app">
    <router-link to="/base">基础</router-link>
    <router-link to="/actions">实战</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


