import APWarsBridge from "./APWarsBridge.json";

export default class Worker {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsBridge, this.contractAddress);
    this.smcManager = {};
  }

  depositERC20(_tokens, _amounts, from) {
    return this.smc.methods.depositERC20(_tokens, _amounts).send({ from });
  }

  depositERC1155(_ids, _amounts, from) {
    return this.smc.methods.depositERC1155(_ids, _amounts).send({ from });
  }

}
