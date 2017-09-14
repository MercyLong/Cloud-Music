import { fetchSongDetail, fetchVideoDetail, fetchPlayListDetail } from 'service';
import { SET_CURRENT_SONG_INFO, SET_CURRENT_VIDEO_INFO, SET_CURRENT_PLAY_LIST_DETAIL } from './mutations-type.js';
export default {
  async fetchSongDetailByAction({ commit, state }, songId) {
    let res = await fetchSongDetail(songId);
    console.log(res);
    commit(SET_CURRENT_SONG_INFO, res.songs[0]);
  },
  async fetchVideoDetailByAction({ commit, state }, videoId) {
    let res = await fetchVideoDetail(videoId);
    commit(SET_CURRENT_VIDEO_INFO, res.data);
  },
  async fetchPlayListDetailByAction({ commit, state }, id) {
    let res = await fetchPlayListDetail(id);
    commit(SET_CURRENT_PLAY_LIST_DETAIL, res.playlist);
  }
};
