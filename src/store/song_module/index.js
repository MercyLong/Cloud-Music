import { fetchSongDetail } from 'service';
export default {
  state: {
    // 当前播放的音乐信息
    currentSongInfo: {}
  },
  mutations: {
    // 设置当前播放音乐的信息
    SET_CURRENT_SONG_INFO(state, songInfo) {
      state.currentSongInfo = Object.assign({}, songInfo);
    }
  },
  getters: {
    getCurrentSongInfo(state) {
      return state.currentSongInfo;
    }
  },
  actions: {
    async fetchSongDetailByAction({ commit, state }, songId) {
      let res = await fetchSongDetail(songId);
      console.log(res);
      commit('SET_CURRENT_SONG_INFO', res.songs[0]);
    }
  }
};
