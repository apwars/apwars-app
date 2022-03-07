export default {
  setAccount: (state, account) => {
    state.account = account;
  },

  setIsConnected: (state, isConnected) => {
    state.isConnected = isConnected;
  },

  setOpenModalMetaMask: (state) => {
    state.openModalMetaMask = true;
  },

  setNetworkInfo: (state, networkInfo) => {
    state.networkInfo = networkInfo;
  },

  setAddresses: (state, addresses) => {
    state.addresses = addresses;
  },

  updateCurrentBlockNumber: (state, currentBlockNumber) => {
    state.currentBlockNumber = currentBlockNumber;
  },

  changeAvatar: (state, { avatar }) => {
    state.avatar = avatar;

    localStorage.setItem("avatar", avatar);
  },

  setBalances(state, balances) {
    state.balances = balances;
  },

  setLoadingBalances(state, loading) {
    state.isLoadingBalances = loading;
  }
};
