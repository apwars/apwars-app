import BaseController from './BaseController';
import store from "@/store";

export default class SoldierController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  wallets(account) {
    try {
      return this.base._get(`/wallets/${account}`);
    } catch (error) {
      throw error;
    }
  }

  getNFTByType(account, type) {
    try {
      return this.base._get(`/accounts/${account}/nfts/${type}`);
    } catch (error) {
      throw error;
    }
  }

}
