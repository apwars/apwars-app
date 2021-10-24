import PancakePairABI from "./PancakePair.json";
import ERC20ABI from "./ERC20.json";
import BigNumber from "bignumber.js";


export default class PancakePair {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      PancakePairABI,
      this.contractAddress
    );
    this.tokenAmountA = null;
    this.tokenAmountB = null;
    this.tokenA = null;
    this.tokenB = null;
    this.totalSupplyAmount = null;
  }

  async setVariablesDefault() {

    if (this.tokenAmountA === null || this.tokenAmountB === null || this.totalSupplyAmount === null) {
      this.tokenA = await this.getTokenA();
      this.tokenB = await this.getTokenB();
      this.totalSupplyAmount = new BigNumber(await this.totalSupply());
      this.smcTokenA = new window.web3.eth.Contract(
        ERC20ABI,
        this.tokenA
      );
      this.tokenA = new BigNumber(await this.smcTokenA.methods.balanceOf(this.contractAddress));
      this.smcTokenB = new window.web3.eth.Contract(
        ERC20ABI,
        this.tokenB
      );
      this.tokenB = new BigNumber(await this.smcTokenB.methods.balanceOf(this.contractAddress));

    } else {
      // update variables
      (async () => {
        this.smcTokenA = new window.web3.eth.Contract(
          ERC20ABI,
          this.tokenA
        );
        this.tokenA = new BigNumber(await this.smcTokenA.methods.balanceOf(this.contractAddress));
        this.smcTokenB = new window.web3.eth.Contract(
          ERC20ABI,
          this.tokenB
        );
        this.tokenB = new BigNumber(await this.smcTokenB.methods.balanceOf(this.contractAddress));
        this.totalSupplyAmount = new BigNumber(await this.totalSupply());
      })();
    }

    return {
      tokenA: this.tokenA,
      tokenB: this.tokenB,
      tokenAmountA: this.tokenAmountA,
      tokenAmountB: this.tokenAmountB,
      totalSupplyAmount: this.totalSupplyAmount
    };
  }

  getTokenA() {
    return this.smc.methods.token0().call();
  }

  getTokenB() {
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
    await this.setVariablesDefault();
    amountA = new BigNumber(amountA);
    amountB = new BigNumber(amountB);
    amountA = amountA.div(amountA.times(this.totalSupplyAmount), this.tokenAmountA);
    amountB = amountB.div(amountB.times(this.totalSupplyAmount), this.tokenAmountB);
    return new amountA.isLessThanOrEqualTo(amountB) ? amountA : amountB;
  }


}
