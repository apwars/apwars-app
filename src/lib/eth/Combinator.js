import APWarsCombinator from "./APWarsCombinator.json";
import APWarsCombinatorManager from "./APWarsCombinatorManager.json";
import { ethers } from "ethers";
import Convert from "../helpers/Convert";

export default class Combinator {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsCombinator, this.contractAddress);
    this.smcManager = {};
  }

  async getContractManager() {
    this.contractManagerAddress = await this.getCombinatorManagerAddress();
    this.smcManager = new window.web3.eth.Contract(APWarsCombinatorManager, this.contractManagerAddress);
  }

  getCombinatorManagerAddress() {
    return this.smc.methods.combinatorManagerAddress().call();
  }

  combineTokens(combinatorId, multiple, from) {
    return this.smc.methods.combineTokens(combinatorId, multiple).send({ from });
  }

  combinators(combinatorId, player) {
    return this.smc.methods.combinators(combinatorId, player).call();
  }

  claimGameItemFromTokens(combinatorId, from) {
    this.smc.methods.claimGameItemFromTokens(combinatorId).call({ from });
    return this.smc.methods.claimGameItemFromTokens(combinatorId).send({ from });
  }

  claimTokenFromTokens(combinatorId, from) {
    this.smc.methods.claimTokenFromTokens(combinatorId).call({ from });
    return this.smc.methods.claimTokenFromTokens(combinatorId).send({ from });
  }

  getGeneralConfig(player, source, combinatorId) {
    return this.smcManager.methods.getGeneralConfig(player, source, combinatorId).call();
  }

  getTokenAConfig(player, source, combinatorId) {
    return this.smcManager.methods.getTokenAConfig(player, source, combinatorId).call();
  }

  getTokenBConfig(player, source, combinatorId) {
    return this.smcManager.methods.getTokenBConfig(player, source, combinatorId).call();
  }

  getTokenCConfig(player, source, combinatorId) {
    return this.smcManager.methods.getTokenCConfig(player, source, combinatorId).call();
  }

  getGameItemAConfig(player, source, combinatorId) {
    return this.smcManager.methods.getGameItemAConfig(player, source, combinatorId).call();
  }

  getGameItemBConfig(player, source, combinatorId) {
    return this.smcManager.methods.getGameItemBConfig(player, source, combinatorId).call();
  }

  getGameItemCConfig(player, source, combinatorId) {
    return this.smcManager.methods.getGameItemCConfig(player, source, combinatorId).call();
  }

}
