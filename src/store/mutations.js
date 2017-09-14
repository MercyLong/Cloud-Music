import {
  CHANGE_HOME_TAB,
  SET_SEARCH_KEYWORD,
  SET_CURRENT_SONG_INFO,
  SET_AUDIO_TIME,
  SET_PLAYING_STATUS,
  CHANGE_LOOP_STATUS,
  SET_CURRENT_SONG_ID,
  SET_CURRENT_PLAY_LIST,
  SET_CURRENT_VIDEO_INFO,
  SET_AUDIO_URL,
  SET_LRC_INFO,
  SET_RUNNING_STATUS,
  SET_CURRENT_PLAY_LIST_DETAIL,
  SET_AUDIO_ELEMENT,
  SET_PLAY_LIST_TYPE,
  SET_LRC_OFFSET,
  SET_LRC_OFFSETHEIGHT
} from './mutations-type.js';
export default {
  // 改变主页tab栏
  [CHANGE_HOME_TAB](state, index) {
    state.homeTabCurrentIndex = index;
  },
  // 设置搜索关键字
  [SET_SEARCH_KEYWORD](state, keyword) {
    state.searchKeywords = keyword;
  },
  [SET_CURRENT_SONG_INFO](state, songInfo) {
    state.currentSongInfo = Object.assign({}, songInfo);
  },
  [SET_AUDIO_TIME](state, time) {
    state.audioCurrentTime = time;
  },
  [SET_PLAYING_STATUS](state, boolean) {
    state.isPlaying = boolean;
  },
  [CHANGE_LOOP_STATUS](state, loopStatus) {
    state.loopStatus = loopStatus;
  },
  [SET_CURRENT_SONG_ID](state, songId) {
    state.currentSongId = songId;
  },
  [SET_CURRENT_PLAY_LIST](state, playLists) {
    state.currentPlayLists = [...playLists];
  },
  [SET_CURRENT_VIDEO_INFO](state, videoInfo) {
    state.currentVideoInfo = Object.assign({}, videoInfo);
  },
  [SET_AUDIO_URL](state, url) {
    state.songAudioUrl = url;
  },
  [SET_LRC_INFO](state, lrcInfo) {
    state.lrcInfo = lrcInfo;
  },
  [SET_RUNNING_STATUS](state, boolean) {
    state.isRunningInBackground = boolean;
  },
  [SET_CURRENT_PLAY_LIST_DETAIL](state, detailInfo) {
    state.currentPlayListDetail = Object.assign({}, detailInfo);
  },
  [SET_AUDIO_ELEMENT](state, element) {
    state.audioElement = element;
  },
  [SET_PLAY_LIST_TYPE](state, boolean) {
    state.playListType = boolean;
  },
  [SET_LRC_OFFSET](state, number) {
    state.offset = number;
  },
  [SET_LRC_OFFSETHEIGHT](state, number) {
    state.offsetHeight = number;
  }
};
