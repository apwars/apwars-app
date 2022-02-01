import BaseController from './BaseController';
import store from "@/store";

export default class LPController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  info() {
    try {
      return this.base._get('/lp/info');
    } catch (error) {
      throw error;
    }
  }


}
