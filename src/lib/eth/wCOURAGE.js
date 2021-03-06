import APWarsCourageToken from "./APWarsCourageToken.json";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

export default class wCOURAGE {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      APWarsCourageToken,
      this.contractAddress
    );
  }

  allowance(owner, spender) {
    return this.smc.methods.allowance(owner, spender).call();
  }

  balanceOf(account) {
    return this.smc.methods.balanceOf(account).call();
  }

  totalSupply() {
    return this.smc.methods.totalSupply().call();
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
}
