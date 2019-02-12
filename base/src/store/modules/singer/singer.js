const types = {
  SET_SINGER: 'SET_SINGER',
}

const singer = {
  state: {
    namespace: true,
    // 歌手
    singer: {
      'name': 'singer'
    },
  },
  getters: {
    singer: (state) => state.singer
  },
  mutations: {
    [types.SET_SINGER](state, singer) {
      state.singer = singer
    },
  },
  actions: {

  }
}

export default singer
