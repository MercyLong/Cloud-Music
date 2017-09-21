import { fetchPlayListDetail, fetchClassifyPlayListData } from 'service';
export default {
  state: {
    // 当前播放歌单详情
    currentPlayListDetail: {},
    // 当前播放歌单列表
    currentPlayLists: [],
    // 当前播放列表类型 true.歌单类型 false.历史信息（本地信息）
    playListType: false,
    // 分类歌单中所选类型
    playListClassifyType: '全部',
    playListClassifyInfo: [],
    classifyLoadingStatus: false
  },
  getters: {
    currentPlayListDetail(state) {
      return state.currentPlayListDetail;
    },
    currentPlayLists(state) {
      return state.currentPlayLists;
    },
    playListType(state) {
      return state.playListType;
    },
    playListClassifyType(state) {
      return state.playListClassifyType;
    },
    playListClassifyInfo(state) {
      return state.playListClassifyInfo;
    },
    classifyLoadingStatus(state) {
      return state.classifyLoadingStatus;
    }
  },
  actions: {
    async fetchPlayListDetailByAction({ commit, state }, id) {
      let res = await fetchPlayListDetail(id);
      commit('SET_CURRENT_PLAY_LIST_DETAIL', res.playlist);
    },
    // 获得分类歌单的所有数据
    async fetchClassifyPlayListDataByAction({ commit, state }, options) {
      let res = await fetchClassifyPlayListData(options);
      return res;
    }
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
    },
    SET_PLAY_LIST_CLASSIFY_TYPE(state, category) {
      state.playListClassifyType = category;
    },
    SET_PLAY_LIST_CLASSIFY_INFO(state, info) {
      state.playListClassifyInfo = [...info];
    },
    SET_CLASSIFY_LOADING_STATUS(state, boolean) {
      state.classifyLoadingStatus = boolean;
    }
  }
};
