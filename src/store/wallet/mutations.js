import { NFT } from "@/data/NFTs";

export default {
  setOnChainBalance: (state, balances) => {
    state.onChainBalance = balances;
  },
  setOffChainBalance: (state, balances) => {
    state.offChainBalance = balances;
  },
  setSoldierLoading(state, loading) {
    state.isSoldierLoading = loading;
  },
  setSoldier(state, { type, soldier }) {
    if (type === NFT.HUMAN) {
      state.humanSoldier = soldier;
    } else {
      state.orcSoldier = soldier;
    }
  }
};
