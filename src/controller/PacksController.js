import BaseController from './BaseController';
import store from "@/store";

export default class PacksController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getOne(packageName) {
    try {
      return this.base._get(`/packs/${packageName}`);
    } catch (error) {
      throw error;
    }
  }

  buyPack(account, packageName) {
    try {
        return this.base._postSignature(`/accounts/${account}/packs/${packageName}/purchases/v2`);
      } catch (error) {
        throw error;
      }
  }


}
