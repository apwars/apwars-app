import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

const avatar = localStorage.getItem("avatar");

const state = {
  isConnected: false,
  openModalMetaMask: false,
  account: "",
  avatar: avatar ? avatar : "corp",
  networkInfo: { definedNetwork: process.env.VUE_APP_BSC_NETWORK },
  addresses: {},
  currentBlockNumber: 0,
  balances: null,
  isLoadingBalances: false,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
