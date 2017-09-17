export default {
  state: {
    // 搜索是否存在关键字
    searchKeywords: null
  },
  mutations: {
    // 设置关键字
    SET_SEARCH_KEYWORD(state, searchKeywords) {
      state.searchKeywords = searchKeywords;
    }
  },
  getters: {
    // 获取关键字
    getKeywords(state) {
      return state.searchKeywords;
    }
  },
  actions: {}
};
