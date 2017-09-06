import {
  CHANGE_HOME_TAB,
  SET_SEARCH_KEYWORD
} from './mutations-type.js';
export default {
  // 改变主页tab栏
  [CHANGE_HOME_TAB](state, index) {
    state.homeTabCurrentIndex = index;
  },
  // 设置搜索关键字
  [SET_SEARCH_KEYWORD](state, keyword) {
    state.searchKeywords = keyword;
  }
};
