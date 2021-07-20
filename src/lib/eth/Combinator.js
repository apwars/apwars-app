import APWarsCombinator from "./APWarsCombinator.json";
import { ethers } from "ethers";
import Convert from "../helpers/Convert";

export default class Combinator {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsCombinator, this.contractAddress);
  }

}
