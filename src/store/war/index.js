import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const initialState = () => ({
  isLoading: false,
  war: null,
  fullBoard: null,
  humansBoard: {
    isLoading: false,
    data: null,
  },
  orcsBoard: {
    isLoading: false,
    data: null,
  },
  elvesBoard: {
    isLoading: false,
    data: null,
  },
  undeadBoard: {
    isLoading: false,
    data: null,
  },
  isLoadingSoldier: false,
  humanSoldier: null,
  orcSoldier: null,
  countdown: 0,
  phase: 'not-started',
  accountPrizes: [],
  completeFormations: {},
});

export default {
  namespaced: true,
  state: initialState(),
  mutations,
  actions,
  getters,
};
