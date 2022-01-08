import BaseController from './BaseController';
import store from "@/store";

export default class WarsController {
  constructor() {
    const addresses = store.getters["user/addresses"];
    this.base = new BaseController(addresses.apiArcadia);
  }

  getOne(warId) {
    try {
      return this.base._get(`/wars/${warId}`);
    } catch (error) {
      throw error;
    }
  }
  getBoard(warId, raceName) {
    try {
      return this.base._get(`/wars/${warId}/slots/${raceName}`);
    } catch (error) {
      throw error;
    }
  }

  getReport(warId, raceName, account) {
    console.log(account)
    try {
      return this.base._get(`/wars/${warId}/${raceName}/report/${account}`);
    } catch (error) {
      throw error;
    }
  }

  enlist(warId, faction, race, account, formation, gameItems = [], slot) {
    const enlistment = {
      faction,
      race,
      account,
      formation,
      gameItems,
      slot
    };
    try {
      return this.base._postSignature(`/wars/${warId}/enlistment`, enlistment);
    } catch (error) {
      console.error('Error while trying to enlist', JSON.stringify(error));
    }
  }
}