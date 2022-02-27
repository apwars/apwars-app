import { NFT } from "@/data/NFTs";

export default {
  setOnChainBalance: (state, balances) => {
    state.onChainBalance = balances;
  },
  setOffChainBalance: (state, balances) => {
    state.offChainBalance = balances;
  },
  setLoadingBalances(state, loading) {
    state.isLoadingBalances = loading;
  },
  setSoldierLoading(state, loading) {
    state.isLoadingSoldier = loading;
  },
  setSoldier(state, { type, soldier }) {
    if (type === NFT.HUMAN) {
      state.humanSoldier = soldier;
    } else {
      state.orcSoldier = soldier;
    }
  }
};
