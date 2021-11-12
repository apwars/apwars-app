import APWarsLoyaltyProgram from "./APWarsLoyaltyProgram.json";
import APWarsLoyaltyProgramManager from "./APWarsLoyaltyProgramManager.json";

export default class LoyaltyProgram {
  constructor(contract) {
    this.contractAddress = contract;
    this.contractManagerAddress = "";
    this.smc = new window.web3.eth.Contract(APWarsLoyaltyProgram, this.contractAddress);
    this.smcManager = {};
  }

  async getContractManager() {
    this.contractManagerAddress = await this.getLoyaltyManagerAddress();
    this.smcManager = new window.web3.eth.Contract(APWarsLoyaltyProgramManager, this.contractManagerAddress);
  }

  getLoyaltyManagerAddress() {
    return this.smc.methods.loyaltyManagerAddress().call();
  }

  getGeneralConfig(_player, _source, _loyaltyId) {
    return this.smcManager.methods.getGeneralConfig(_player, _source, _loyaltyId).call();
  }

  getRewardConfig(_player, _source, _loyaltyId) {
    return this.smcManager.methods.getRewardConfig(_player, _source, _loyaltyId).call();
  }

  getLpConfig(_player, _source, _loyaltyId) {
    return this.smcManager.methods.getLpConfig(_player, _source, _loyaltyId).call();
  }

  startLoyaltyProgram(_LoyaltyProgramId, from) {
    return this.smc.methods.startLoyaltyProgram(_LoyaltyProgramId, 1).send({ from });
  }

  getLoyalties(_LoyaltyProgramId, from) {
    return this.smc.methods.loyalties(_LoyaltyProgramId, from).call();
  }

  getBalanceLp(_LoyaltyProgramId, from) {
    return this.smc.methods.balanceLp(_LoyaltyProgramId, from).call();
  }

  withdraw(_LoyaltyProgramId, from) {
    return this.smc.methods.withdraw(_LoyaltyProgramId).send({ from });
  }

  withdrawAndRenew(_LoyaltyProgramId, from) {
    return this.smc.methods.withdrawAndRenew(_LoyaltyProgramId).send({ from });
  }

}
