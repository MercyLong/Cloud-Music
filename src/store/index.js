// 导出CreateStore方法,为以后服务器端渲染做准备
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
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
      // 当前播放的音乐信息
      currentSongInfo: {},
      // 当前播放音乐的id
      currentSongId: null,
      // 是否正在播放
      isPlaying: true,
      audioCurrentTime: 0,
      // 循环方式，默认列表循环
      loopStatus: 0,
      loopInitData: [{
          id: 0,
          text: '列表循环',
          icon: '&#xe6f2;'
        },
        {
          id: 1,
          text: '单曲循环',
          icon: '&#xe602;'
        },
        {
          id: 2,
          text: '随机循环',
          icon: '&#xe62a;'
        }
      ],
      // 当前播放歌单
      currentPlayLists: [],
      // 当前视频信息
      currentVideoInfo: {}
    },
    actions,
    mutations
  });
};
