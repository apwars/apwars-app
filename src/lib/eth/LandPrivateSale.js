import APWarsLandPrivateSale from "./APWarsLandPrivateSale.json";
import Convert from "../helpers/Convert";


export default class LandPrivateSale {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsLandPrivateSale, this.contractAddress);
  }

  combineTokens(combinatorId, multiple, from) {
    return this.smc.methods.combineTokens(combinatorId, multiple).send({ from });
  }

  wLANDSoldAmount() {
    return this.smc.methods.wLANDSoldAmount().call();
  }

  maxSupply() {
    return this.smc.methods.MAX_SUPPLY().call();
  }

  pricewLAND(_wLANDSoldAmount) {
    return this.smc.methods.getBUSDwLANDPriceAmount(_wLANDSoldAmount, Convert.toWei(1)).call();
  }

  async buywLAND(amount, from) {
    const error = await this.smc.methods.buywLAND(amount).call({ from });
    console.log(error);
    return this.smc.methods.buywLAND(amount).send({ from });
  }

}
