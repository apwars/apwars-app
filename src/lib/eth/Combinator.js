import APWarsCombinator from "./APWarsCombinator.json";
import APWarsCombinatorManager from "./APWarsCombinatorManager.json";
import { ethers } from "ethers";
import Convert from "../helpers/Convert";

export default class Combinator {
  constructor(contract, contractManager) {
    this.contractAddress = contract;
    this.contractManagerAddress = contractManager;
    this.smc = new window.web3.eth.Contract(APWarsCombinator, this.contractAddress);
    window.test = this.smc;
    this.smcManager = {};
    if (contractManager) {
      this.smcManager = new window.web3.eth.Contract(APWarsCombinatorManager, this.contractManagerAddress);
    }
  }

  combineTokens(combinatorId, multiple, from) {
    return this.smc.methods.combineTokens(combinatorId, multiple).send({ from });
  }

  combinators(combinatorId, player) {
    return this.smc.methods.combinators(combinatorId, player).call();
  }

  claimGameItemFromTokens(combinatorId, from) {
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

}
