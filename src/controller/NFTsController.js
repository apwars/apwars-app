import BaseController from './BaseController';
import store from "@/store";

export default class NFTsController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  hasSoldier(account) {
    try {
      return this.base._get(`/nfts/owners/soldier/${account}`);
    } catch (error) {
      throw error;
    }
  }


}
