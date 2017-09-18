import { fetchPlayListDetail } from 'service';
export default {
  state: {
    currentRankInfo: {}
  },
  getters: {
    currentRankInfo(state) {
      return state.currentRankInfo;
    }
  },
  actions: {
    async fetchRankListDetailByAction({ commit, state }, id) {
      let res = await fetchPlayListDetail(id);
      commit('SET_CURRENT_RANK_LIST_INFO', res.playlist);
    }
  },
  mutations: {
    SET_CURRENT_RANK_LIST_INFO(state, info) {
      state.currentRankInfo = Object.assign({}, info);
    }
  }
};
