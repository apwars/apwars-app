import APWarsTroops from "./APWarsTroops.json";
import Addresss from "../../data/Addresses";

export default class Troops {
  constructor(contract) {
    this.contractAddress = contract;
    this.smc = new window.web3.eth.Contract(APWarsTroops, this.contractAddress);
  }

  async balanceOf(account) {
    return await this.smc.methods.balanceOf(account).call();
  }

  async priceWGOLD(account) {
    const wGOLD = new window.web3.eth.Contract(
      APWarsTroops,
      Addresss.wGOLD[56]
    );
    const balanceOfwGOLD = await wGOLD.methods.balanceOf(account).call();
    const balanceOfTrooper = await this.balanceOf(account);

    return window.web3.utils.toWei(
      (balanceOfwGOLD / balanceOfTrooper).toString(),
      "ether"
    );
  }
}
