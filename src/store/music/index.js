import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  isPlaying: false,
  track: null,
  volume: 0,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
