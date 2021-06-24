import APWarsTroops from "./APWarsTroops.json";
import Addresss from "../../data/Addresses";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import Convert from "../helpers/Convert";

export default class Troops {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsTroops, this.contractAddress);
  }

  async balanceOf(account) {
    return await this.smc.methods.balanceOf(account).call();
  }

  async totalSupply() {
    return await this.smc.methods.totalSupply().call();
  }

  allowance(owner, spender) {
    return this.smc.methods.allowance(owner, spender).call();
  }

  approve(from, spender) {
    return this.smc.methods
      .approve(spender, ethers.constants.MaxUint256)
      .send({ from });
  }

  async hasAllowance(owner, spender) {
    const allowance = await this.allowance(owner, spender);
    const bn = new BigNumber(allowance);
    return bn.gt(0);
  }

  async priceWGOLD(account) {
    try {
      const wGOLD = new window.web3.eth.Contract(
        APWarsTroops,
        Addresss.wGOLD[56]
      );
      const balanceOfwGOLD = await wGOLD.methods.balanceOf(account).call();
      const balanceOfTrooper = await this.balanceOf(account);
  
      const result = new BigNumber(balanceOfwGOLD).dividedBy(balanceOfTrooper);
  
      return Convert.toWei(result);
    } catch (error) {
      console.log(error);
      return "0";
    }
  }
}
