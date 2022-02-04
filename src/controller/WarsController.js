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

  getLastId() {
    try {
      return this.base._get(`/wars/lastId`);
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

  bringhome(warId, account, magicalItems) {
    try {
      return this.base._postSignature(`/wars/${warId}/bringhome`, { account, magicalItems });
    } catch (error) {
      throw error;
    }
  }

  getFormation(formation) {
    try {
      return this.base._get(`/wars/formation/${formation}`);
    } catch (error) {
      throw error;
    }
  }

  getAccountPrizes(warId, account) {
    try {
      return this.base._get(`/wars/${warId}/prizes/${account}`);
    } catch (error) {
      throw error;
    }
  }

  getTransfers(warId) {
    try {
      return this.base._get(`/wars/${warId}/transactions`);
    } catch (error) {
      throw error;
    }
  }
}