import APWarsLandSale from "./APWarsLandSale.json";
import Convert from "../helpers/Convert";

export default class LandPrivateSale {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      APWarsLandSale,
      this.contractAddress
    );
  }

  async buywLAND(amount, ref, from) {
    const error = await this.smc.methods.buywLAND(amount, ref).call({ from });
    return this.smc.methods.buywLAND(amount, ref).send({ from });
  }

  async buyTicket(ticketId, amount, ref, from) {
    const error = await this.smc.methods.buyTicket(ticketId, amount, ref).call({ from });
    return this.smc.methods.buyTicket(ticketId, amount, ref).send({ from });
  }
}
