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
      this.tokenAmountA = new BigNumber(await this.smcTokenA.methods.balanceOf(this.contractAddress).call());
      this.smcTokenB = new window.web3.eth.Contract(
        ERC20ABI,
        this.tokenB
      );
      this.tokenAmountB = new BigNumber(await this.smcTokenB.methods.balanceOf(this.contractAddress).call());

    } else {
      // update variables
      (async () => {
        this.smcTokenA = new window.web3.eth.Contract(
          ERC20ABI,
          this.tokenA
        );
        this.tokenAmountA = new BigNumber(await this.smcTokenA.methods.balanceOf(this.contractAddress).call());
        this.smcTokenB = new window.web3.eth.Contract(
          ERC20ABI,
          this.tokenB
        );
        this.tokenAmountB = new BigNumber(await this.smcTokenB.methods.balanceOf(this.contractAddress).call());
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

  async getCalculateToken(amountWei, token) {
    await this.setVariablesDefault();
    let tokenAmount;
    amountWei = new BigNumber(amountWei);

    if (token.toLowerCase() === this.tokenA.toLowerCase()) {
      tokenAmount = amountWei.times(this.tokenAmountB).div(this.tokenAmountA);
    } else if (token.toLowerCase() === this.tokenB.toLowerCase()) {
      tokenAmount = amountWei.times(this.tokenAmountA).div(this.tokenAmountB);
    }

    return tokenAmount.integerValue(BigNumber.ROUND_DOWN).toString();
  }

  async getLiquidityMinted(amountA, amountB) {
    await this.setVariablesDefault();
    amountA = new BigNumber(amountA);
    amountB = new BigNumber(amountB);
    amountA = amountA.times(this.totalSupplyAmount).div(this.tokenAmountA);
    amountB = amountB.times(this.totalSupplyAmount).div(this.tokenAmountB);
    return new amountA.isLessThanOrEqualTo(amountB) ? amountA.integerValue(BigNumber.ROUND_DOWN).toString() : amountB.integerValue(BigNumber.ROUND_DOWN).toString();
  }


}
