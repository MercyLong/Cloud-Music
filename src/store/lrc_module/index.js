// 歌词LRC模块
export default {

  state: {
    // 歌词偏移量
    offset: 0,
    // 歌词偏移高度
    offsetHeight: 0
  },
  mutations: {
    SET_LRC_OFFSET(state, number) {
      state.offset = number;
    },
    SET_LRC_OFFSETHEIGHT(state, number) {
      state.offsetHeight = number;
    }
  }
};
