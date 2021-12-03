import BaseController from './BaseController';
import store from "@/store";

export default class BridgeController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  depositERC20(tx) {
    try {
      return this.base._post(`/bridge/deposit/${tx}/depositERC20`);
    } catch (error) {
      throw error;
    }
  }

  depositERC1155(tx) {
    try {
      return this.base._post(`/bridge/deposit/${tx}/depositERC1155`);
    } catch (error) {
      throw error;
    }
  }

}
