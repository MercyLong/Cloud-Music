import { fetchSongDetail, fetchVideoDetail, fetchPlayListDetail } from 'service';
import { SET_CURRENT_SONG_INFO, SET_CURRENT_VIDEO_INFO, SET_CURRENT_PLAY_LIST_DETAIL } from './mutations-type.js';
import { replaceImageUrl } from 'config/mixin';
console.log(replaceImageUrl);
export default {
  async fetchSongDetailByAction({ commit, state }, songId) {
    let res = await fetchSongDetail(songId);
    // 替换歌曲详情的imageUrl
    res.songs[0].al.picUrl = replaceImageUrl.tinyImageUrl(res.songs[0].al.picUrl, 720);
    commit(SET_CURRENT_SONG_INFO, res.songs[0]);
  },
  async fetchVideoDetailByAction({ commit, state }, videoId) {
    let res = await fetchVideoDetail(videoId);
    commit(SET_CURRENT_VIDEO_INFO, res.data);
  },
  async fetchPlayListDetailByAction({ commit, state }, id) {
    let res = await fetchPlayListDetail(id);
    commit(SET_CURRENT_PLAY_LIST_DETAIL, res.playlist);
    return res.playlist;
  }
};
