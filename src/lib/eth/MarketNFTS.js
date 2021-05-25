import APWarsMarketNFTS from "./APWarsMarketNFTS.json";

const buyType = 0;
const sellType = 1;

export default class MarketNFTS {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      APWarsMarketNFTS,
      this.contractAddress
    );
    window.APWarsMarketNFTS = this.smc;
  }

  getOrdersLength() {
    return this.smc.methods.getOrdersLength().call();
  }

  getOrdersLength() {
    return this.smc.methods.getOrdersLength().call();
  }

  getOrderInfo(idOrder) {
    return this.smc.methods.getOrderInfo(idOrder).call();
  }

  async getMarket(type, pageLimit, page) {
    page = page - 1;
    const count = await this.getOrdersLength();
    const start = count - pageLimit * page;

    const promises = [];

    for (let i = start; i > start - pageLimit && i > 0; i--) {
      promises.push(this.getOrderInfo(i - 1));
    }

    const market = await Promise.all(promises);

    return market.filter(m => m.orderType.toString() === type.toString());
  }

  claim(from, token, id, price, signature) {
    return this.smc.methods.claim(token, id, price, signature).send({ from });
  }

  async getRemaining(id) {
    const total = await this.getTotalSupply(id);
    const max = await this.getMaxSupply(id);

    return max - total;
  }

  async getMaxSupply(id) {
    const intialSupply = await this.smc.methods.getMaxSupply(id).call();
    return parseInt(intialSupply, 10);
  }

  async getTotalSupply(id) {
    const intialSupply = await this.smc.methods.getTotalSupply(id).call();
    return parseInt(intialSupply, 10);
  }

  async getSwapFeeRate() {
    const swapFee = await this.smc.methods.getSwapFeeRate().call();
    
    return swapFee / 100;
  }

  createOrderBuy(address, id, contractwGOLD, amount, from) {
    console.log("CREATEORDER");
    console.log(`address ; ${address}`);
    console.log(`id ; ${id}`)
    console.log(`contractwGOLD ; ${contractwGOLD}`);
    console.log(`amount ; ${amount}`);
    console.log(`from ; ${from}`);
    return this.smc.methods.createOrder(
      buyType,
      address,
      id,
      contractwGOLD,
      amount
    ).send({ from })
  }

  createOrderSell(address, id, contractwGOLD, amount, from) {
    return this.smc.methods.createOrder(
      sellType,
      address,
      id,
      contractwGOLD,
      amount
    ).send({ from });
  }
}
