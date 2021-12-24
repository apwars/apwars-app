import BaseController from './BaseController';
import store from "@/store";

export default class WarsController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getOne(warId) {
    try {
      return this.base._get(`/v1/wars/${warId}`);
    } catch (error) {
      throw error;
    }
  }
}