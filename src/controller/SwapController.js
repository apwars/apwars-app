import BaseController from './BaseController';

export default class SwapController {
  constructor(api) {
    this.base = new BaseController(api);
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