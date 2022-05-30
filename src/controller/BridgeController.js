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

  claimSaveTx(tx) {
    try {
      return this.base._post(`/bridge/claim/${tx}/tx`);
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

  getListTokens() {
    try {
      return this.base._get('/bridge/list/tokens');
    } catch (error) {
      throw error;
    }
  }

  getListGameItems() {
    try {
      return this.base._get('/bridge/list/gameitems');
    } catch (error) {
      throw error;
    }
  }

  reprocessTx(reprocessTx) {
    try {
      return this.base._postSignature('/bridge/reprocess', { reprocessTx });
    } catch (error) {
      throw error;
    }
  }
}
