import { fetchVideoDetail } from 'service';
export default {
  state: {
    currentVideoInfo: {}
  },
  getters: {
    currentVideoInfo(state) {
      return state.currentVideoInfo;
    }
  },
  mutations: {
    SET_CURRENT_VIDEO_INFO(state, videoInfo) {
      state.currentVideoInfo = Object.assign({}, videoInfo);
    }
  },
  actions: {
    async fetchVideoDetailByAction({ commit, state }, videoId) {
      let res = await fetchVideoDetail(videoId);
      commit('SET_CURRENT_VIDEO_INFO', res.data);
    }
  }
};
