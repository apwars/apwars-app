import PancakePair from "./PancakePair.json";
import BigNumber from "bignumber.js";


export default class Transporter {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      PancakePair,
      this.contractAddress
    );
    this.tokenAmountA = null;
    this.tokenAmountB = null;
    this.totalSupplyAmount = null;
  }

  async setVariablesDefault() {
    if (this.tokenAmountA === null || this.tokenAmountB === null || this.totalSupplyAmount === null) {
      this.tokenAmountA = new BigNumber(await this.tokenA());
      this.tokenAmountB = new BigNumber(await this.tokenB());
      this.totalSupplyAmount = new BigNumber(await this.totalSupply());
    } else {
      // update variables
      (async () => {
        this.tokenAmountA = new BigNumber(await this.tokenA());
        this.tokenAmountB = new BigNumber(await this.tokenB());
        this.totalSupplyAmount = new BigNumber(await this.totalSupply());
      })();
    }

    return {
      tokenAmountA: this.tokenAmountA,
      tokenAmountB: this.tokenAmountB,
      totalSupplyAmount: this.totalSupplyAmount
    };
  }

  tokenA() {
    return this.smc.methods.token0().call();
  }

  tokenB() {
    return this.smc.methods.token1().call();
  }

  totalSupply() {
    return this.smc.methods.totalSupply().call();
  }

  balanceOf(account) {
    return this.smc.methods.balanceOf(account).call();
  }

  // async getCalculateToken(token) {
  //   await this.setVariablesDefault();

  //   if ()



  //     await this.setVariablesDefault();
  //   const amountA = new BigNumber.div(BigNumber.times(amountA, this.totalSupplyAmount), this.tokenAmountA)
  //   const amountB = new BigNumber.div(BigNumber.times(amountB, this.totalSupplyAmount), this.tokenAmountB)
  //   return new BigNumber.isLessThanOrEqualTo(amountA, amountB) ? amountA : amountB
  // }

  async getLiquidityMinted(amountA, amountB) {
    console.log(amountA);
    await this.setVariablesDefault();
    amountA = new BigNumber(amountA);
    amountB = new BigNumber(amountB);
    amountA = amountA.div(amountA.times(this.totalSupplyAmount), this.tokenAmountA);
    amountB = amountB.div(amountB.times(this.totalSupplyAmount), this.tokenAmountB);
    return new amountA.isLessThanOrEqualTo(amountB) ? amountA : amountB;
  }


}
