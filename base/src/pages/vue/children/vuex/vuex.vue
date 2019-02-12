<template>
  <page
    :title="$route.meta.title">
    <div class="vuex"></div>
  </page>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    singer() {
      return this.$store.state.singer.singer
    },
    songList() {
      return this.$store.state.songList.songList
    },
    newSinger() {
      return this.$store.state.newSinger.songList
    }
    // ...mapGetters([
    //   'singer',
    //   'newSinger'
    // ])
  },
  mounted() {
    // console.log(this.$store.state)
    // console.log('this.singer', this.singer)
    // console.log('this.newSinger', this.newSinger)
    // console.log(this.songList)
    // this.$store.watch((state, getter) => {
    //   console.log('getter', getter)
    //   return getter.songList.length === 4
    // }, () => {
    //   console.log('watch')
    // })

    this.commitSongList()
    console.log(this.songList)
    this.dispatchSongList()

    setTimeout(() => {
      console.log(this.songList)
    }, 2000)
  },
  methods: {
    commitSongList() {
      this.$store.commit('SET_SONG_LIST', [1, 2, 3])
    },
    dispatchSongList() {
      this.$store.dispatch('selectSongList', [4, 5, 6, 7])
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
