import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const state = {
  isLoadingBalance: false,
  onChainBalance: {},
  offChainBalance: {},
  isLoadingSoldier: false,
  humanSoldier: null,
  orcSoldier: null,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
