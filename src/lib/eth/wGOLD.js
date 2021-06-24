import APWarsGoldToken from "./APWarsGoldToken.json";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import Addresss from "../../data/Addresses";
import Convert from "../helpers/Convert";

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

  async priceWGOLD(networkId) {
    try {
      const busd = new window.web3.eth.Contract(
        APWarsGoldToken,
        Addresss.BUSD[networkId]
      );
      const balanceOfUSD = await busd.methods
        .balanceOf(Addresss.wGOLD_BUSD_LP[networkId])
        .call();
      const balanceOfWgold = await this.balanceOf(Addresss.wGOLD_BUSD_LP[networkId]);

      const result = new BigNumber(balanceOfUSD).dividedBy(balanceOfWgold);

      return Convert.toWei(result);
    } catch (error) {
      console.log(error);
      return "0";
    }
  }
}
