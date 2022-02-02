import CakeLPABI from "./CakeLP.json";
import BigNumber from "bignumber.js";

export default class CakeLP {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      CakeLPABI,
      this.contractAddress
    );
  }

  balanceOf(account) {
    return this.smc.methods.balanceOf(account).call();
  }

  totalSupply() {
    return this.smc.methods.totalSupply().call();
  }

  getReservers() {
    return this.smc.methods.getReservers().call();
  }

  async percentageInLP(account) {
    const balance = await this.balanceOf(account);
    const totalSupply = await this.totalSupply();

    return parseFloat(new BigNumber(balance).div(totalSupply).toFixed(4));
  }

}
