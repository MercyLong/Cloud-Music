// 专辑模块
import { fetchAlbumDetail } from 'service';
export default {
  state: {
    currentAlbumInfo: {}
  },
  getters: {
    currentAlbumInfo(state) {
      return state.currentAlbumInfo;
    }
  },
  mutations: {
    SET_ALBUM_INFO(state, info) {
      state.currentAlbumInfo = Object.assign({}, info);
    }
  },
  actions: {
    async fetchAlbumDetailByAction({ commit, state }, id) {
      let res = await fetchAlbumDetail(id);
      commit('SET_ALBUM_INFO', res);
    }
  }
};
