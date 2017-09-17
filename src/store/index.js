// 导出CreateStore方法,为以后服务器端渲染做准备
import Vue from 'vue';
import Vuex from 'vuex';
import SearchModule from './search_module';
import TabModule from './tab_module';
import AudioModule from './audio_module';
import SongModule from './song_module';
import PlayListModule from './playList_module';
import LRCModule from './lrc_module';
Vue.use(Vuex);
export function CreateStore() {
  return new Vuex.Store({
    // state: {

    //   // 音频DOM元素
    //   audioElement: null,
    //   // 过场动画
    //   globalLoading: true,
    //   // 首页tab的索引
    //   homeTabCurrentIndex: 0,
    //   // 搜索是否存在关键字
    //   searchKeywords: null,
    //   // 当前播放的音乐信息
    //   currentSongInfo: {},
    //   // 当前播放音乐的id
    //   currentSongId: null,
    //   // 歌词偏移量
    //   offset: 0,
    //   // 歌词偏移高度
    //   offsetHeight: 0,
    //   // 是否正在播放
    //   isPlaying: false,
    //   // 设置音频的URL
    //   songAudioUrl: '',
    //   audioCurrentTime: 0,
    //   // 循环方式，默认列表循环
    //   loopStatus: 0,
    //   // 歌词数组
    //   lrcInfo: [],
    //   loopInitData: [{
    //       id: 0,
    //       text: '列表循环',
    //       icon: '&#xe6f2;'
    //     },
    //     {
    //       id: 1,
    //       text: '单曲循环',
    //       icon: '&#xe602;'
    //     },
    //     {
    //       id: 2,
    //       text: '随机循环',
    //       icon: '&#xe62a;'
    //     }
    //   ],
    //   // 当前播放歌单详情
    //   currentPlayListDetail: {},
    //   // 当前播放歌单列表
    //   currentPlayLists: [],
    //   // 当前视频信息
    //   currentVideoInfo: {},
    //   // 当前播放列表类型 true.歌单类型 false.历史信息（本地信息）
    //   playListType: false,
    //   // 当前排行榜单
    //   currentRankInfo: {}
    // },
    modules: {
      search: SearchModule,
      tab: TabModule,
      audio: AudioModule,
      song: SongModule,
      playList: PlayListModule,
      LRC: LRCModule
    }
  });
};
