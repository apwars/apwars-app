import BaseController from './BaseController';
import store from "@/store";

export default class ArcadiaController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getLands(account) {
    try {
      return this.base._get(`/worlds/1/lands?owner=${account}`);
    } catch (error) {
      throw error;
    }
  }

}