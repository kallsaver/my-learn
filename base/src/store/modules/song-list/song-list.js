const types = {
  SET_SONG_LIST: 'SET_SONG_LIST',
}

const songList = {
  state: {
    // 歌曲
    songList: [],
  },
  getters: {
    songList: (state) => state.songList
  },
  mutations: {
    [types.SET_SONG_LIST](state, songList) {
      state.songList = songList
    },
  },
  actions: {
    selectSongList({ commit }, songList) {
      setTimeout(() => {
        console.log(songList)
        commit(types.SET_SONG_LIST, songList)
      }, 1000)
    }
  }
}

export default songList
