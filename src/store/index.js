// 导出CreateStore方法,为以后服务器端渲染做准备
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
Vue.use(Vuex);
export function CreateStore() {
  return new Vuex.Store({
    state: {
      // 过场动画
      globalLoading: true,
      // 首页tab的索引
      homeTabCurrentIndex: 0,
      // 搜索是否存在关键字
      searchKeywords: null,
      recommendList: []
    },
    mutations
  });
};
