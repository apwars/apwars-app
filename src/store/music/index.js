import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  isPlaying: false,
  track: null,
  isSoundActive: false,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
