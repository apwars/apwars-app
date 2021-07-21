import APWarsCombinator from "./APWarsCombinator.json";
import APWarsCombinatorManager from "./APWarsCombinatorManager.json";
import { ethers } from "ethers";
import Convert from "../helpers/Convert";

export default class Combinator {
  constructor(contract, contractManager) {
    this.contractAddress = contract;
    this.contractManagerAddress = contractManager;
    this.smc = new window.web3.eth.Contract(APWarsCombinator, this.contractAddress);
    this.smcManager = {};
    if (contractManager) {
      this.smcManager = new window.web3.eth.Contract(APWarsCombinatorManager, this.contractManagerAddress);
    }
  }

  combineTokens(combinatorId, multiple, from) {
    return this.smc.methods.combineTokens(combinatorId, multiple).send({ from });
  }

  getGeneralConfig(player, source, combinatorId) {
    return this.smcManager.methods.getGeneralConfig(player, source, combinatorId).call();
  }

}
