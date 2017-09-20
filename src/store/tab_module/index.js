export default {
  state: {
    // 首页tab的索引
    homeTabCurrentIndex: 0,
    // 歌手页tab的索引
    artistTabCurrentIndex: 0
  },
  mutations: {
    // 改变首页Tab的索引
    CHANGE_HOME_TAB(state, idx) {
      state.homeTabCurrentIndex = idx;
    },
    CHANGE_ARTIST_TAB(state, idx) {
      state.artistTabCurrentIndex = idx;
    }
  },
  getters: {
    // 获取首页当前索引
    getHomeIndex(state) {
      return state.homeTabCurrentIndex;
    },
    artistTabCurrentIndex(state) {
      return state.artistTabCurrentIndex;
    }
  }
};
