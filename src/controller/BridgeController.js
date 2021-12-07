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

  claimERC20({ tokens, amounts }) {
    try {
      return this.base._postSignature('/bridge/claim/claimERC20', { tokens, amounts });
    } catch (error) {
      throw error;
    }
  }

  claimERC1155({ tokens, amounts }) {
    try {
      return this.base._postSignature('/bridge/claim/claimERC1155', { tokens, amounts });
    } catch (error) {
      throw error;
    }
  }

  getHistory(account, pagination) {
    pagination = pagination || { limit: 10, skip: 0 };
    try {
      return this.base._get(`/bridge/history/${account}?limit=${pagination.limit}&skip=${pagination.skip}`);
    } catch (error) {
      throw error;
    }
  }

}
