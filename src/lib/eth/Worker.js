import APWarsWorker from "./APWarsWorker.json";

export default class Worker {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsWorker, this.contractAddress);
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
  

}
