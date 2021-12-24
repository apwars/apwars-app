import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const initialState = () => ({
  war: null,
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
  undeadsBoard: {
    isLoading: false,
    data: null,
  },
});

export default {
  namespaced: true,
  state: initialState(),
  mutations,
  actions,
  getters,
};
