export default {
  state: {
    // 当前播放歌单详情
    currentPlayListDetail: {},
    // 当前播放歌单列表
    currentPlayLists: [],
    // 当前播放列表类型 true.歌单类型 false.历史信息（本地信息）
    playListType: false
  },
  mutations: {
    SET_CURRENT_PLAY_LIST_DETAIL(state, detailInfo) {
      state.currentPlayListDetail = Object.assign({}, detailInfo);
    },
    SET_PLAY_LIST_TYPE(state, boolean) {
      state.playListType = boolean;
    },
    SET_CURRENT_PLAY_LIST(state, playLists) {
      state.currentPlayLists = [...playLists];
    }
  }
};
