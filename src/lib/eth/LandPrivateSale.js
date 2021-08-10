import APWarsLandPrivateSale from "./APWarsLandPrivateSale.json";
import Convert from "../helpers/Convert";

export default class LandPrivateSale {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      APWarsLandPrivateSale,
      this.contractAddress
    );
  }

  getClaimInfo(_account) {
    return this.smc.methods.shares(_account).call();
  }

  combineTokens(combinatorId, multiple, from) {
    return this.smc.methods
      .combineTokens(combinatorId, multiple)
      .send({ from });
  }

  async getPriorityEndBlock() {
    return parseInt(await this.smc.methods.priorityEndBlock().call());
  }

  async getAvailableAmounts() {
    return (
      await this.smc.methods
        .getAvailableAmounts(await this.smc.methods.wLANDSoldAmount().call())
        .call()
    ).map(i => Convert.fromWei(i, true));
  }

  async getPrivateSaleEndBlock() {
    return parseInt(await this.smc.methods.privateSaleEndBlock().call());
  }

  wLANDSoldAmount() {
    return this.smc.methods.wLANDSoldAmount().call();
  }

  maxSupply() {
    return this.smc.methods.MAX_SUPPLY().call();
  }

  pricewLAND(_wLANDSoldAmount, _amount) {
    return this.smc.methods
      .getBUSDwLANDPriceAmount(
        Convert.toWei(_wLANDSoldAmount),
        _amount ? Convert.toWei(_amount) : Convert.toWei(1)
      )
      .call();
  }

  async isInPriorityPeriod(_block) {
    const priorityEndBlock = parseInt(
      await this.smc.methods.priorityEndBlock().call()
    );
    console.log({
      _block,
      priorityEndBlock
    });
    return _block < priorityEndBlock;
  }

  async hasBoughtInPriotiryLevel(_account) {
    const whitelistPriority = await this.smc.methods
      .whitelistPriority(_account)
      .call();
    const amount = await this.getHardCommit(_account);

    return amount > 0 && !whitelistPriority;
  }

  getHardCommit(_account) {
    return this.smc.methods.whitelistAmount(_account).call();
  }

  async buywLAND(amount, from) {
    const error = await this.smc.methods.buywLAND(amount).call({ from });
    console.log(error);
    return this.smc.methods.buywLAND(amount).send({ from });
  }

  async claimwLAND(from) {
    const error = await this.smc.methods.claimwLAND().call({ from });
    console.log(error);
    return this.smc.methods.claimwLAND().send({ from });
  }

  checkWhitelist(_account) {
    return this.smc.methods.checkWhitelist(_account).call();
  }

  getAvailableWorldTickets() {
    return this.smc.methods.getAvailableWorldTickets().call();
  }

  getAvailableClanTickets() {
    return this.smc.methods.getAvailableClanTickets().call();
  }

  getWorldTicketBalance(_account) {
    return this.smc.methods.worldTicketOwners(_account).call();
  }

  getClanTicketBalance(_account) {
    return this.smc.methods.clanTicketOwners(_account).call();
  }

  async claimwWISDOW(from) {
    const error = await this.smc.methods.claimwWISDOW().call({ from });
    console.log(error);
    return this.smc.methods.claimwWISDOW().send({ from });
  }

  async claimWorldTicket(from) {
    const error = await this.smc.methods.claimWorldTicket().call({ from });
    console.log(error);
    return this.smc.methods.claimWorldTicket().send({ from });
  }

  async claimClanTicket(from) {
    const error = await this.smc.methods.claimClanTicket().call({ from });
    console.log(error);
    return this.smc.methods.claimClanTicket().send({ from });
  }

  async buyWorldTicket(from) {
    const error = await this.smc.methods.buyWorldTicket().call({ from });
    console.log(error);
    return this.smc.methods.buyWorldTicket().send({ from });
  }

  async buyClanTicket(from) {
    const error = await this.smc.methods.buyClanTicket().call({ from });
    console.log(error);
    return this.smc.methods.buyClanTicket().send({ from });
  }
}
