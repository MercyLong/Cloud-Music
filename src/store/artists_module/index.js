import { fetchArtistDetail, fetchArtistAlbum } from 'service';
export default {
  state: {
    currentArtistInfo: {},
    currentArtistAlbum: {}
  },
  getters: {
    currentArtistInfo(state) {
      return state.currentArtistInfo;
    },
    currentArtistAlbum(state) {
      return state.currentArtistAlbum;
    }
  },
  mutations: {
    SET_CURRENT_ARTIST_INFO(state, info) {
      state.currentArtistInfo = Object.assign({}, info);
    },
    SET_CURRENT_ARTIST_ALBUM(state, albumInfo) {
      state.currentArtistAlbum = Object.assign({}, albumInfo);
    }
  },
  actions: {
    async fetchArtistInfoByAction({ commit, state }, id) {
      let res = await fetchArtistDetail(id);
      commit('SET_CURRENT_ARTIST_INFO', res);
    },
    async fetchArtistAlbumByAction({ commit, state }, id) {
      let res = await fetchArtistAlbum(id);
      commit('SET_CURRENT_ARTIST_ALBUM', res);
      return res;
    }
  }
};
