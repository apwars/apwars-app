import Vue from "vue";

export default {
  setAccount: (state, account) => {
    state.account = account;
  },

  setIsConnected: (state, isConnected) => {
    state.isConnected = isConnected;
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
  }
};
