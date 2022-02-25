import WalletController from "@/controller/WalletController";
import wGOLDContract from "@/lib/eth/wGOLD";
import wCOURAGEContract from "@/lib/eth/wCOURAGE";
import wLANDContract from "@/lib/eth/ERC20";
import SoldierController from "@/controller/SoldierController";
import { NFT } from "@/data/NFTs";

export default {
  fetchBalances({ dispatch }) {
    dispatch('fecthOnChainBalances');
    dispatch('fecthOffChainBalances');
  },
  async fecthOnChainBalances({ rootState, commit }) {
    const addresses = rootState.user.addresses;
    const wallet = rootState.user.account;
    const wGOLD = await new wGOLDContract(addresses.wGOLD).balanceOf(wallet);
    const wCOURAGE = await new wCOURAGEContract(addresses.wCOURAGE).balanceOf(wallet);
    const wLAND = await new wLANDContract(addresses.wLAND).balanceOf(wallet);

    const balances = {
        wGOLD,
        wCOURAGE,
        wLAND
    };

    commit('setOnChainBalance', balances);
  },
  async fecthOffChainBalances({ rootState, commit }) {
    const controller = new WalletController();
    const w = await controller.wallets(rootState.user.account);
    commit('setOffChainBalance', w.balances);
  },
  async checkSoldiers({commit, rootState}) {
    const controller = new SoldierController();
    commit('setSoldierLoading', true);
    try {
      const soldier = await controller.getNFTByType(rootState.user.account, NFT.HUMAN);
      console.log(soldier)
      commit('setSoldier', {type: NFT.HUMAN, soldier });
    } catch (error) {
      console.error(error);
    }
    try {
      const soldier =  await controller.getNFTByType(rootState.user.account, NFT.ORC);
      commit('setSoldier', {type: NFT.ORC, soldier });
    } catch (error) {
      console.error(error);
    }
    commit('setSoldierLoading', false);
  },
}