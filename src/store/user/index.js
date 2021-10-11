import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const avatar = localStorage.getItem("avatar");

const state = {
  isConnected: false,
  openModalMetaMask: false,
  account: "",
  avatar: avatar ? avatar : "corp",
  networkInfo: {},
  addresses: {},
  currentBlockNumber: 0
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
