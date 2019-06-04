const types = {
  SET_NEW_SINGER: 'SET_NEW_SINGER',
  SET_YEAR: 'SET_YEAR'
}

const newSinger = {
  namespace: true,
  state: {
    // 歌手
    newSinger: {
      'name': 'newSinger'
    },
    year: 0
  },
  getters: {
    newSinger(state, getters, rootState, rootGetters) {
      console.log('state', state)
      console.log(rootState)
      return state.newSinger
    },
    year(state, getters, rootState, rootGetters) {
      return state.year
    }
  },
  mutations: {
    [types.SET_SINGER](state, newSinger) {
      state.newSinger = newSinger
    },
    [types.SET_YEAR](state, year) {
      state.year = year
    },
  },
  actions: {
    selectSinger({ dispatch, commit, getters, rootGetters }) {

    }
  }
}

export default newSinger
