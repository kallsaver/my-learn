import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import myPlugin from './plugins/vuex-persisted.js'

// modules
import singer from './modules/singer/singer.js'
import newSinger from './modules/new-singer/new-singer.js'
import songList from './modules/song-list/song-list.js'

const debug = process.env.NODE_ENV !== 'production'

const VuexPlugins = [
  myPlugin({
    key: 'myPlugin',
    subscribe(mutations, next) {
      console.log(666, mutations)
      next()
    },
    filter(mutations) {
      // 过滤掉
      if (mutations.type === 'SET_RECOMMEND_ALBUM') {
        return false
      }
      return true
    }
  })
]

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    singer,
    newSinger,
    songList
  },
  strict: debug,
  plugins: debug ? VuexPlugins.concat([createLogger()]) : VuexPlugins
})
