<template>
  <div class="home">
    <div @click="clickHandler">{{msg}}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component({})
export default class Home extends Vue {
  msg = '21'
  value = ''

  mounted() {
    console.log('mounted')
    this.value = 'dg'
  }

  clickHandler() {
    console.log('click')
  }

  @Watch('value')
  onChangeValue(newVal: string): void {
    console.log(newVal)
  }
}
</script>
