import { fetchSongLRC } from 'service';
// 歌词LRC模块
export default {

  state: {
    // 歌词数组
    lrcInfo: [],
    // 歌词偏移量
    offset: 0,
    // 歌词偏移高度
    offsetHeight: 0
  },
  getters: {
    lrcInfo(state) {
      return state.lrcInfo;
    },
    offset(state) {
      return state.offset;
    },
    offsetHeight(state) {
      return state.offsetHeight;
    }
  },
  mutations: {
    SET_LRC_OFFSET(state, number) {
      state.offset = number;
    },
    SET_LRC_OFFSETHEIGHT(state, number) {
      state.offsetHeight = number;
    },
    SET_LRC_INFO(state, arr) {
      state.lrcInfo = [...arr];
    }
  },
  actions: {
    async fetchSongLRCByAction({ commit, state }, songId) {
      let res = await fetchSongLRC(songId);
      return res;
    }
  }
};
