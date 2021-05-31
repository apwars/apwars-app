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

  getBuyOrdersLength() {
    return this.smc.methods.getBuyOrdersLength().call();
  }

  getSellOrdersLength() {
    return this.smc.methods.getSellOrdersLength().call();
  }

  getOrderInfo(idOrder) {
    return this.smc.methods.getOrderInfo(idOrder).call();
  }

  getOrderIdBuy(orderIndex) {
    return this.smc.methods.getOrderIdBuy(orderIndex).call();
  }

  getOrderIdSell(orderIndex) {
    return this.smc.methods.getOrderIdSell(orderIndex).call();
  }

  async getMarket(type, pageLimit, page) {
    page = page - 1;
    const total =
      type === "0"
        ? await this.getBuyOrdersLength()
        : await this.getSellOrdersLength();

    const start = total - pageLimit * page;
    const promises = [];

    for (let i = start; i > start - pageLimit && i > 0; i--) {
      const orderId =
        type === "0"
          ? await this.getOrderIdBuy(i - 1)
          : await this.getOrderIdSell(i - 1);
      promises.push(this.getOrderInfo(orderId));
    }

    const market = await Promise.all(promises);

    return {
      data: market.filter((m) => m.orderStatus === "0"),
      total: total,
    };
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

  createOrder(buyType, address, id, contractwGOLD, amount, quantity, from) {
    amount = window.web3.utils.toWei(amount.toString(), "ether");
    return this.smc.methods
      .createOrder(buyType, address, id, contractwGOLD, amount, quantity)
      .send({ from });
  }

  getOrderAmountInfo(amount) {
    amount = web3.utils.toWei(amount.toString(), "ether");
    return this.smc.methods.getOrderAmountInfo(amount).call();
  }

  executeOrder(orderId, quantity, from) {
    return this.smc.methods.executeOrder(orderId, quantity).send({ from });
  }
}
