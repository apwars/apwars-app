import BaseController from './BaseController';
import store from "@/store";

export default class SoldierController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getNFTByType(account, type) {
    try {
      return this.base._get(`/accounts/${account}/nfts/${type}`);
    } catch (error) {
      if (error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  unlockNFT(account, type) {
    try {
      return this.base._postSignature(`/nfts/${type}`, { account });
    } catch (error) {
      throw error;
    }
  }

  changeName(account, type, name) {
    try {
      return this.base._put(`/accounts/${account}/nfts/${type}`, { account, name });
    } catch (error) {
      throw error;
    }
  }

  rechargeToken(account, type, token) {
    try {
      return this.base._postSignature(`/accounts/${account}/nfts/${type}/recharges/${token}`, { account });
    } catch (error) {
      throw error;
    }
  }

  upgradeSkill(account, type, skills) {
    try {
      return this.base._put(`/accounts/${account}/nfts/${type}`, { account, skills });
    } catch (error) {
      throw error;
    }
  }

}