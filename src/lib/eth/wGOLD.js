import APWarsGoldToken from "./APWarsGoldToken.json";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import Addresss from "../../data/Addresses";

export default class wGOLD {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      APWarsGoldToken,
      this.contractAddress
    );
  }

  allowance(owner, spender) {
    return this.smc.methods.allowance(owner, spender).call();
  }

  balanceOf(account) {
    return this.smc.methods.balanceOf(account).call();
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

  async priceWGOLD() {
    const busd = new window.web3.eth.Contract(
      APWarsGoldToken,
      Addresss.BUSD[56]
    );
    const balanceOfUSD = await busd.methods
      .balanceOf(Addresss.wGOLD_BUSD_LP[56])
      .call();
    const balanceOfWgold = await this.balanceOf(Addresss.wGOLD_BUSD_LP[56]);

    return window.web3.utils.toWei(
      (balanceOfUSD / balanceOfWgold).toString(),
      "ether"
    );
  }
}
