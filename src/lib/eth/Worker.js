import APWarsWorker from "./APWarsWorker.json";
import APWarsWorkerManager from "./APWarsWorkerManager.json";

export default class Worker {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsWorker, this.contractAddress);
    this.smcManager = {};
  }

  async getContractManager() {
    this.contractManagerAddress = await this.workerManagerAddress();
    this.smcManager = new window.web3.eth.Contract(APWarsWorkerManager, this.contractManagerAddress);
  }

  workerManagerAddress() {
    return this.smc.methods.workerManagerAddress().call();
  }

  infoAccount(from) {
    return this.smc.methods.accounts(from).call();
  }

  claim(from) {
    return this.smc.methods.claim().send({ from });
  }

  withdraw(amount, from) {
    return this.smc.methods.withdraw(from, amount).send({ from });
  }

  reductionRate() {
    return this.smc.methods.reductionRate().call();
  }

  minimumBlocks() {
    return this.smc.methods.minimumBlocks().call();
  }

  defaultBlocks() {
    return this.smcManager.methods.defaultBlocks().call();
  }


}
