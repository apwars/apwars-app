import APWarsTransporter from "./APWarsTransporter.json";

const buyType = 0;
const sellType = 1;

export default class Transporter {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(
      APWarsTransporter,
      this.contractAddress
    );
  }

  sendNFT(tokenAddressNFT, tokenBeneficiary, tokenId, quantity, from) {
    return this.smc.methods
      .sendNFT(tokenAddressNFT, tokenBeneficiary, tokenId, quantity)
      .send({
        from,
      });
  }

  getFeeAmount() {
    return this.smc.methods.getFeeAmount().call();
  }
}
