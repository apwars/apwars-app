import APWarsCombinator from "./APWarsCombinator.json";
import APWarsCombinatorManager from "./APWarsCombinatorManager.json";
import { ethers } from "ethers";
import Convert from "../helpers/Convert";

export default class Combinator {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsCombinator, this.contractAddress);
    this.smcManager = new window.web3.eth.Contract(APWarsCombinatorManager, this.contractAddress);
  }

  combineTokens(combinatorId, multiple, from) {
    return this.smc.methods.combineTokens(combinatorId, multiple).send({ from });
  }

}
