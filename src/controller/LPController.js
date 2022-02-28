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

  transactions(account) {
    try {
      return this.base._get(`/transfers/${account}/loyalty-program`);
    } catch (error) {
      throw error;
    }
  }


  report() {
    try {
      return this.base._get(`/lp/report`);
    } catch (error) {
      throw error;
    }
  }

  getLevels(account) {
    try {
      return this.base._get(`/accounts/${account}/lp-levels`);
    } catch (error) {
      throw error
    }
  }

}
