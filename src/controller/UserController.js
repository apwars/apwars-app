import BaseController from './BaseController';
import store from "@/store";

export default class UserController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getProfile(account) {
    try {
      return this.base._get(`/users/${account}`);
    } catch (error) {
      throw error;
    }
  }

  updateProfile(account, { name, race, country }) {
    try {
      return this.base._postSignatureEthers(`/users/${account}`, { account, name, race, country }, 'PUT');
    } catch (error) {
      throw error;
    }
  }

  getBadges(account) {
    return this.base._get(`/users/${account}/badges`);
  }

}
