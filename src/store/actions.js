import { fetchSongDetail, fetchVideoDetail } from 'service';
import { SET_CURRENT_SONG_INFO, SET_CURRENT_VIDEO_INFO } from './mutations-type.js';
export default {
  async fetchSongDetailByAction({ commit, state }, songId) {
    let res = await fetchSongDetail(songId);
    commit(SET_CURRENT_SONG_INFO, res.songs[0]);
  },
  async fetchVideoDetailByAction({ commit, state }, videoId) {
    let res = await fetchVideoDetail(videoId);
    commit(SET_CURRENT_VIDEO_INFO, res.data);
  }
};
