import BaseController from './BaseController';
import store from "@/store";

export default class SwapController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getOptions() {
    try {
      return this.base._get(`/fresh-start-swap/list-swap`);
    } catch (error) {
      throw error;
    }
  }

  swap(tx, swapId, soldier) {
    try {
      return this.base._post(`/fresh-start-swap/${tx}/${swapId}/${soldier}`);
    } catch (error) {
      throw error;
    }
  }

}