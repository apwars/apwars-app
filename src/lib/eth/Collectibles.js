import APWarsCollectibles from "./APWarsCollectibles.json";

export default class Collectibles {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      APWarsCollectibles,
      this.contractAddress
    );
  }

  async balanceOf(account, id) {
    const balance = await this.smc.methods.balanceOf(account, id).call();
    return parseInt(balance, 10);
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

  setApprovalForAll(address, from, approval = true) {
    return this.smc.methods.setApprovalForAll(address, approval).send({
      from
    });
  }

  isApprovedForAll(from, address) {
    return this.smc.methods.isApprovedForAll(from, address).call();
  }
}
