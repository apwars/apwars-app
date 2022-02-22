import WalletController from "@/controller/WalletController";
import wGOLDContract from "@/lib/eth/wGOLD";
import wCOURAGEContract from "@/lib/eth/wCOURAGE";
import wLANDContract from "@/lib/eth/ERC20";

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
}