import Web3 from "web3";
import { getSmartContractAddresses } from "@/lib/Config";

export default {
  disconnectFromMetaMask({ commit }) {
    commit("setIsConnected", false);
    commit("setAccount", "");
  },

  changeAvatar({ commit }, { avatar }) {
    commit("changeAvatar", { avatar });
  },

  updateCurrentBlockNumber({ commit }, { blockNumber }) {
    commit("updateCurrentBlockNumber", blockNumber);
  },

  openModalMetaMask({ commit }) {
    commit("setOpenModalMetaMask", true);
  },

  async connectToMetaMask({ commit }) {
    const configure = async ({ commit }) => {
      const accounts = await window.ethereum.enable();
      const networkInfo = {
        id: (await web3.eth.net.getId()).toString(),
        type: await web3.eth.net.getNetworkType(),
        definedNetwork: process.env.VUE_APP_BSC_NETWORK,
      };

      const addresses = getSmartContractAddresses(networkInfo.id);
      commit("setIsConnected", true);
      commit("setAccount", accounts[0]);
      commit("setNetworkInfo", networkInfo);
      commit("setAddresses", addresses);
    };

    const clear = ({ commit }) => {
      commit("setIsConnected", false);
      commit("setAccount", null);
      commit("setNetworkInfo", {});
      commit("setAddresses", null);
    };

    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);

      window.ethereum.on("accountsChanged", accounts => {
        configure({ commit });
      });

      window.ethereum.on("networkChanged", networkId => {
        window.location.reload();
      });

      ethereum.on("disconnect", () => {
        clear({ commit });
      });

      try {
        configure({ commit });
        // await window.ethereum.request({
        //   method: "wallet_requestPermissions",
        //   params: [
        //     {
        //       eth_accounts: {}
        //     }
        //   ]
      } catch (e) {
        clear({ commit });
      }
    } else {
      clear({ commit });
    }
  }
};
